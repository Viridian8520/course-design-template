import { Modal, Form, Input, Button, Select, message, theme } from 'antd';
import { useEffect, useState } from 'react';
import { getCategoryList, updateGoods } from './service';

export default function UpdateExpModal(props: { [propName: string]: any }) {

  const { isVisible, setIsVisible, updateList, data } = props;
  const [form] = Form.useForm();
  const [qualityOptions, setQualityOptions] = useState<Array<any>>();
  const { token } = theme.useToken();

  useEffect(() => {
    getCategoryList().then(res => {
      if (res) {
        setQualityOptions(getQualityOptions(res.data.data));
      }
    })
  }, [])

  const getQualityOptions = (data: Array<any>) => {
    const options: { label: any; value: any; }[] = [];
    data.forEach(item => {
      options.push({
        label: item.name,
        value: item.id,
      });
    })
    return options;
  }

  useEffect(() => {
    if (isVisible === true) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onFinish = (values: { [propName: string]: any }) => {
    let reqData: { [propName: string]: any } = {};
    for (let key in values) {
      if (values[key] != data[key]) {
        reqData[key] = values[key];
      }
    }
    updateGoods(reqData, data.id).then(_res => {
      updateList();
      setIsVisible(false);
      message.success('更新商品成功！')
    })
  };

  const onFinishFailed = (errorInfo: { [propName: string]: any }) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="更新商品"
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
            label="商品名称"
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
            label="商品描述"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="商品类型"
            rules={[{ required: true, message: '请选择商品类型' }]}
          >
            <Select options={qualityOptions} style={{ width: 120 }}>
            </Select>
          </Form.Item>

          <Form.Item
            label="商品图片"
            name="picture"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea placeholder='只支持图片url' />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: '50%', backgroundColor: token.colorPrimary }}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
