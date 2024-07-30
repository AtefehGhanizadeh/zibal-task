import { Flex } from "antd";
import CustomModal from "./components/Modal/CustomModal";
import CustomTable from "./components/Table/CustomTable";

function App() {
  return <Flex vertical style={{gap:"20px"}}>
    <CustomTable/>
    <CustomModal/>
  </Flex>;
}

export default App;
