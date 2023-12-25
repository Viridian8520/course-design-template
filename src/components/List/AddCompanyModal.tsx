import { Modal, Form, Input, Button, Select, message } from 'antd';
import { addCompany, getQualityList } from './service';
import { useEffect, useState } from 'react';

export default function AddCompanyModal(props: { [propName: string]: any }) {

  const { isVisible, setIsVisible, updateList } = props;
  const [qualityOptions, setQualityOptions] = useState<Array<any>>();

  useEffect(() => {
    getQualityList().then(res => {
      if (res) {
        setQualityOptions(getQualityOptions(res.data.data));
      }
    })
  }, [])

  const getQualityOptions = (data: Array<any>) => {
    const options: { label: any; value: any; }[] = [];
    data.forEach(item => {
      options.push({
        label: item.quality,
        value: item.quality,
      });
    })
    return options;
  }

  const onFinish = (values: { [propName: string]: any }) => {
    addCompany(values).then(_res => {
      updateList();
      setIsVisible(false);
      message.success('增加企业成功！')
    })
  };

  const onFinishFailed = (errorInfo: { [propName: string]: any }) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="新增企业"
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
            label="企业名称"
            name="companyName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="企业地址"
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="quality"
            label="企业类型"
            rules={[{ required: true, message: '请选择企业类型' }]}
          >
            <Select options={qualityOptions} style={{ width: 120 }}>
            </Select>
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
