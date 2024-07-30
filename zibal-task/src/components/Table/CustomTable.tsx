import { CopyOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableProps,
  message,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "./CustomTable.css";

interface DataType {
  amount: number | string;
  trackId: number;
  status: number | string;
  paidAt: string;
  cardNumber: string;
}

type DataIndex = keyof DataType;

const CustomTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

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

  //Search Box

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`جستجوی شماره تراکنش`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            پاک کردن
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            فیلتر
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined
        style={{
          fontSize: "13px",
          backgroundColor: "blue",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //

  type ColumnsType<T extends object> = TableProps<T>["columns"];

  const columns: ColumnsType<DataType> = [
    {
      title: "شماره تراکنش",
      dataIndex: "trackId",
      key: "trackId",
      ...getColumnSearchProps("trackId"),
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
