import React from "react";
import { Row, Col, Avatar, Card } from "antd";
import Moment from "moment";

const MessageBox = ({ text, submit_by, submit_at, avatar, own }) => {
  if (!own) {
    return (
      <div>
        <Row type="flex" gutter={6} justify="center" align="top">
          <Col span={3}>
            <Avatar src={avatar} />
          </Col>
          <Col offset={1} span={20}>
            <p style={{ fontSize: "0.95em", margin: "0px" }}>{submit_by}</p>
            <p style={{ fontSize: "0.7em", fontStyle: "italic" }}>
              {Moment(submit_at.toDate()).format("HH:MM DD/MM/YYYY")}
            </p>
          </Col>
        </Row>

        <Row type="flex">
          <Col>
            <div
              style={{
                backgroundColor: "#2295ff",
                color: "white",
                borderRadius: "0px 10px 10px 0px",
                padding: "10px",
                marginBottom: "15px",
                boxShadow: "1px 2px 3px #ccc"
              }}
            >
              {text}
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "right" }}>
        <Col>
          <p style={{ fontSize: "0.95em", margin: "0px" }}>You</p>
          <p style={{ fontSize: "0.7em", fontStyle: "italic" }}>
            {Moment(submit_at.toDate()).format("HH:MM DD/MM/YYYY")}
          </p>
        </Col>
        <Row type="flex" justify="end">
          <Col>
            <div
              style={{
                backgroundColor: "#dddddd",
                color: "black",
                borderColor: "#333",
                borderRadius: "10px 0px 0px 10px",
                padding: "10px",
                marginBottom: "15px",
                boxShadow: "1px 2px 3px #ccc",
                textAlign: "right"
              }}
            >
              {text}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

export default MessageBox;
