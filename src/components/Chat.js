import React from "react";
import { Row, Col, Input, Button, Card, Avatar } from "antd";

class Chat extends React.Component {
  state = {
    message: null
  };

  sendMessage = () => {
    const { message } = this.state;
    if (message) {
      const messageObj = {
        text: message,
        submit_at: new Date(),
        uid: this.props.uid,
        submit_by: this.props.user.displayName,
        avatar: this.props.user.photoURL
      };
      this.props.sendMessage(messageObj);
    }
  };

  render() {
    return (
      <Row gutter={6} type="flex" justify="center" align="center">
        <Col xs={3} sm={2} md={1} style={{ textAlign: "center" }}>
          <Avatar size="medium" src={this.props.user.photoURL} />
        </Col>
        <Col xs={17} sm={18} md={19}>
          <Input
            name="messageInput"
            onChange={e => this.setState({ message: e.target.value })}
          />
        </Col>
        <Col xs={4} sm={4} md={4}>
          <Button block type="primary" onClick={this.sendMessage}>
            Send
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Chat;
