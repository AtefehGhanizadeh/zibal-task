import { Button, Divider, Form, Input, InputNumber, InputNumberProps, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface FieldType {
  destination: string;
  amount: string;
  description?: string;
}

const CustomForm = ({
  handleCancle,
  handleOk,
}: {
  handleCancle: () => void;
  handleOk: () => void;
}) => {
  const [value, setValue] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "ثبت درخواست تسویه با موفقیت انجام شد.",
    });
  };


  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 100 }}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={() => form.resetFields()}
    >
      <div style={{ padding: "20px" }}>
        <Form.Item<FieldType>
          label="مقصد تسویه"
          name="destination"
          rules={[
            {
              required: true,
              message: "لطفا مقصد تسویه موردنظر خود را وارد کنید!",
            },
          ]}
        >
          <Select placeholder="انتخاب شماره شبا و یا ورود شبا جدید">
            <Select.Option value="demo">کیف پول اصلی</Select.Option>
            <Select.Option value="demo">کیف پول پرداخت</Select.Option>
            <Select.Option value="demo">کیف پول تسویه</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="مبلغ تسویه"
          name="amount"
          rules={[
            {
              required: true,
              message: "لطفا مبلغ تسویه موردنظر خود را وارد کنید!",
            },
          ]}
        >
          <InputNumber<number>
            controls={false}
           formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
           parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            style={{ flexDirection: "row-reverse",width:"100%" }}
            prefix={<span style={{ color: "#e2e2e2" }}>ریال</span>}
          />
        </Form.Item>
        <Form.Item label="توضیحات(بابت)">
          <TextArea style={{minHeight:"130px"}} />
        </Form.Item>
      </div>
      <Divider />
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        {contextHolder}
        <Form.Item>
          <Button htmlType="reset" onClick={handleCancle}>
            انصراف
          </Button>
        </Form.Item>
        <Form.Item shouldUpdate>
          {({ getFieldsValue }) => {
            const { destination, amount } = getFieldsValue();
            const formIsComplete = !!destination && !!amount;
            return (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  if (formIsComplete) {
                    handleOk();
                    success();
                  }
                }}
              >
                ثبت درخواست تسویه
              </Button>
            );
          }}
        </Form.Item>
      </div>
    </Form>
  );
};

export default CustomForm;
