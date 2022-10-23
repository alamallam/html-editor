import React from "react";
import { connect } from "react-redux";

import { Button } from "antd";

import {
  initiateFbSignIn as initiateSignIn,
  initiateSignOut
} from "../actions/Auth";

class Auth extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <Button type="primary" block onClick={this.props.initiateSignIn}>
          Sign in to join the Babble
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  { initiateSignIn }
)(Auth);
