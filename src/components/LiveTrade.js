import React from "react";
import { Table } from "antd";

const LiveTrade = ({ dataSource, columns }) => (
  <Table
    size="small"
    dataSource={dataSource}
    columns={columns}
    pagination={false}
    rowClassName={(record, index) => {
      switch (record.Type) {
        case "SELL":
          return "greenRow";
        case "BUY":
          return "redRow";
        default:
          return null;
      }
    }}
  />
);

export default LiveTrade;
