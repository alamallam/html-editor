import React from "react";
import { connect } from "react-redux";
import { messagesSubscribe, addMessage, getMessages } from "../actions/Chat";

import { Card } from "antd";

import Auth from "../components/Auth";
import Chat from "../components/Chat";
import ChatBox from "../components/ChatBox";

class ChatContainer extends React.Component {
  componentDidMount() {
    this.props.getMessages();
  }

  render() {
    console.log("**INSIDE CHAT CONTAINER**", this.props);
    return (
      <div>
        <ChatBox
          messages={this.props.messages}
          uid={!this.props.user ? "00000" : this.props.user.uid}
        />
        <Card>
          {this.props.signedIn ? (
            <Chat
              user={this.props.user}
              sendMessage={this.props.addMessage}
              uid={this.props.user.uid}
            />
          ) : (
            <Auth />
          )}
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.Chat.messages,
    signedIn: state.Auth.signedIn,
    user: state.Auth.user
  };
}

export default connect(
  mapStateToProps,
  { getMessages, addMessage }
)(ChatContainer);
