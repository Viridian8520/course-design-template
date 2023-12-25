import { Modal, Form, Input, Button, message } from 'antd';
import { addStaff } from './service';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useForceUpdate from '@/hooks/useForceUpdate';

export default function AddStaffModal(props: { [propName: string]: any }) {

  const { isVisible, setIsVisible, updateList } = props;
  let companyId: number;
  let deptId: number;
  const { pathname } = useLocation(); // 当前路由
  deptId = parseInt(pathname.split('/')[pathname.split('/').length - 2]);  // 部门id
  companyId = parseInt(pathname.split('/')[pathname.split('/').length - 4]);  // 公司id
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, [isVisible])

  const onFinish = (values: { [propName: string]: any }) => {
    addStaff(values, companyId, deptId).then(_res => {
      updateList();
      setIsVisible(false);
      message.success('增加人员成功！')
    })
  };

  const onFinishFailed = (errorInfo: { [propName: string]: any }) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="新增人员"
        open={isVisible}
        cancelText="返回"
        footer={null}
        onCancel={() => { setIsVisible(false) }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="人员名称"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
              提交
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  );
}
