import type { TabsProps } from "antd";
import { Button, Divider, Flex, Modal, Tabs } from "antd";
import { useState } from "react";
import CustomForm from "./CustomForm";
import "./CustomModal.css";

const CustomModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "به حساب",
      children: (
        <CustomForm handleCancle={handleCancel} handleOk={handleCancel} />
      ),
    },
    {
      key: "2",
      label: "به کیف پول",
      children: (
        <CustomForm handleCancle={handleCancel} handleOk={handleCancel} />
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ width: "200px", borderRadius: "8px", padding: "20px" }}
      >
        تسویه کیف پول
      </Button>
      <Modal
        title="تسویه کیف پول"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        styles={{
          header: {
            padding: "20px",
            borderBottom: "2px solid #f8f8f8",
          },
          content: {
            padding: 0,
            borderRadius: "10px",
            overflow: "hidden",
          }
        }}
      >
        <div>
          <Flex vertical>
            <div style={{ padding: "20px" }}>
              <Flex vertical style={{ gap: "20px" }}>
                <div>موجودی فعلی :</div>
                <div style={{ color: "blue", fontSize: "20px" }}>
                  15,000 تومان
                </div>
              </Flex>
              <Divider />
            </div>
            <Tabs type="card" defaultActiveKey="1" items={items} />
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
