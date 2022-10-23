import React from "react";
import firebase, { auth, provider } from "../firebase";
import { connect } from "react-redux";

import {
  initiateFbSignIn as initiateSignIn,
  initiateSignOut
} from "../actions/Auth";

import AuthComponent from "../components/Auth";

class Auth extends React.Component {
  render() {
    return (
      <AuthComponent
        signedIn={this.props.signedIn}
        user={this.props.user}
        signIn={this.props.initiateSignIn}
        signOut={this.props.initiateSignOut}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.Auth.signedIn,
    user: state.Auth.user
  };
};

export default connect(
  mapStateToProps,
  { initiateSignIn, initiateSignOut }
)(Auth);
