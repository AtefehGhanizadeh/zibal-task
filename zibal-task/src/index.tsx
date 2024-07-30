import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
     <ConfigProvider
     direction="rtl"
    theme={{
      token: {
        // Seed Token
        colorPrimary: 'blue',
        borderRadius: 2,

        // Alias Token
        // colorBgContainer: '#f6ffed',
      },
    }}
  ><App /></ConfigProvider>
    
  </React.StrictMode>
);
