import { SYNC_MESSAGES, GET_MESSAGES_SUCCESS } from "../actions/Chat";

const initialState = {
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case GET_MESSAGES_SUCCESS:
    //   return {
    //     ...state,
    //     messages: action.messages
    //   };
    case SYNC_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };
    default:
      return state;
  }
}
