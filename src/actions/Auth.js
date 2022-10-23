export const initiateFbSignIn = () => {
  return {
    type: "INITIATE_FB_SIGN_IN"
  };
};

export const signInSuccessful = user => {
  return {
    type: "SIGN_IN_SUCCESSFUL",
    user
  };
};

export const initiateSignOut = () => {
  return {
    type: "INITIATE_SIGN_OUT"
  };
};

export const signOutSuccessful = () => {
  return {
    type: "SIGN_OUT_SUCCESSFUL"
  };
};
