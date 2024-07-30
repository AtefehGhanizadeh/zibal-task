import { CopyOutlined } from "@ant-design/icons";
import { Table, TableProps, message } from "antd";
import "./CustomTable.css";
import useSearchBox from "./useSearchBox";
import useFetch from "./useFetch";
import { DataType } from "../../interfaces";


const CustomTable = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const searchbox = useSearchBox();
  type ColumnsType<T extends object> = TableProps<T>["columns"];
  const data = useFetch();

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
          <CopyOutlined
            style={{ color: "blue" }}
            onClick={() => {
              navigator.clipboard.writeText(text.toString());
              copySuccess();
            }}
          />
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
        footer={(currentPageData) => ` تعداد نتایج : ${currentPageData.length}`}
      />
    </div>
  );
};

export default CustomTable;
