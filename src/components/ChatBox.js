import React from "react";
import { Spin } from "antd";

import MessageBox from "./MessageBox";

class ChatBox extends React.Component {
  renderMessages = () => {
    const messages = this.props.messages;
    const MessageArray = [];
    messages.forEach(message => {
      MessageArray.push(
        <MessageBox
          text={message.text}
          avatar={message.avatar}
          submit_at={message.submit_at}
          submit_by={message.submit_by}
          own={this.props.uid === message.uid}
        />
      );
    });
    return (
      <div style={{ padding: "20px", width: "70%" }}>
        {MessageArray.map(Message => Message)}
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.messages ? <this.renderMessages /> : <Spin size="large" />}
      </div>
    );
  }
}

export default ChatBox;
