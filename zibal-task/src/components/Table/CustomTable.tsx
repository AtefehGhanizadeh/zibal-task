import { CopyOutlined } from "@ant-design/icons";
import { Table, TableProps, message } from "antd";
import { useEffect, useState } from "react";
import "./CustomTable.css";
import useSearchBox from "./useSearchBox";

interface DataType {
  amount: number | string;
  trackId: number;
  status: number | string;
  paidAt: string;
  cardNumber: string;
}

const CustomTable = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const searchbox = useSearchBox();
  type ColumnsType<T extends object> = TableProps<T>["columns"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/data");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData: DataType[] = await response.json();
      responseData.map((item) => {
        if (item.status === 1) {
          item.status = "پرداخت موفق";
        } else {
          item.status = " پرداخت ناموفق";
        }
        item.amount = item.amount.toLocaleString();
      });
      setData(responseData);
    };

    fetchData().catch((error) => {
      throw new Error(error.message);
    });
  }, []);

  const copySuccess = () => {
    messageApi.open({
      type: "success",
      content: "شماره تراکنش با موفقیت کپی شد.",
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "شماره تراکنش",
      dataIndex: "trackId",
      key: "trackId",
      ...searchbox("trackId"),
      render: (text: number) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {contextHolder}
          {text}
          <CopyOutlined style={{ color: "blue" }} onClick={copySuccess} />
        </div>
      ),
    },
    {
      title: "وضعیت تراکنش",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {status === "پرداخت موفق" ? (
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "lightgreen",
                width: "6px",
                height: "6px",
              }}
            ></div>
          ) : (
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: "red",
                width: "6px",
                height: "6px",
              }}
            ></div>
          )}
          {status}
        </div>
      ),
    },
    {
      title: "تاریخ پرداخت",
      dataIndex: "paidAt",
      key: "paidAt",
    },
    {
      title: "مبلغ",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "شماره کارت",
      dataIndex: "cardNumber",
      key: "cardNumber",
      render: (text: string) => (
        <div style={{ direction: "ltr", textAlign: "right" }}>{text}</div>
      ),
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        dataSource={data}
        columns={columns}
        footer={() => ` تعداد نتایج : ${data.length}`}
      />
    </div>
  );
};

export default CustomTable;
