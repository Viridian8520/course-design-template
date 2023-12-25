import { Modal, Form, Input, Button, message } from 'antd';
import { addDepartment } from './service';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useForceUpdate from '@/hooks/useForceUpdate';

export default function AddDepartmentModal(props: { [propName: string]: any }) {

  const { isVisible, setIsVisible, updateList } = props;
  let companyId: number;
  const { pathname } = useLocation(); // 当前路由
  companyId = parseInt(pathname.split('/')[pathname.split('/').length - 2]);  // 公司id
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, [isVisible])

  const onFinish = (values: { [propName: string]: any }) => {
    addDepartment(values, companyId).then(_res => {
      updateList();
      setIsVisible(false);
      message.success('增加部门成功！')
    })
  };

  const onFinishFailed = (errorInfo: { [propName: string]: any }) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="新增部门"
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
            label="部门名称"
            name="deptName"
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
