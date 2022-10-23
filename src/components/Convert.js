import React from "react";
import { Select, Row, Col } from "antd";
import { Btc } from "react-cryptocoins";

const Option = Select.Option;

const Convert = () => {
  return (
    <Select defaultValue="btc" style={{ width: 200 }}>
      <Option value="btc" style={{ textAlign: "center" }}>
        <Row type="flex" justify="center" align="middle">
          <Col span={6}>
            <Btc />
          </Col>
          <Col span={18}>BTC</Col>
        </Row>
      </Option>
    </Select>
  );
};

export default Convert;
