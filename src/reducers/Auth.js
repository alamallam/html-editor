const initialState = {
  signedIn: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN_SUCCESSFUL":
      return {
        ...state,
        signedIn: true,
        user: action.user
      };
    default:
      return state;
  }
}
