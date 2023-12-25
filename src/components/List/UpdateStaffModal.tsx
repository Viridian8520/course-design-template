import { Modal, Form, Input, Button, message } from 'antd';
import { useEffect } from 'react';
import { updateStaff } from './service';

export default function UpdateStaffModal(props: { [propName: string]: any }) {

  const { isVisible, setIsVisible, updateList, data } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible === true) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onFinish = (values: { [propName: string]: any }) => {
    updateStaff(values, data.id).then(_res => {
      updateList();
      setIsVisible(false);
      message.success('更新人员成功！')
    })
  };

  const onFinishFailed = (errorInfo: { [propName: string]: any }) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="更新人员"
        open={isVisible}
        cancelText="返回"
        footer={null}
        onCancel={() => { setIsVisible(false) }}
      >
        <Form
          form={form}
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
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
