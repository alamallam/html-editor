export const SYNC_MESSAGES = "SYNC_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const MESSAGES_SUBSCRIBE = "MESSAGES_SUBSCRIBE";
export const FAILED_MESSAGES = "FAILED_MESSAGES";
export const GET_MESSAGES = "GET_MESSAGES";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";

export const messagesSubscribe = () => {
  return {
    type: MESSAGES_SUBSCRIBE
  };
};

export const failedMessages = error => {
  return {
    type: FAILED_MESSAGES,
    error: error
  };
};

export const syncMessages = messages => {
  console.log("INSIDE SYNC MESSAGE ACTION");
  return {
    type: SYNC_MESSAGES,
    messages
  };
};

export const getMessages = () => {
  return {
    type: GET_MESSAGES
  };
};

export const getMessagesSuccess = messages => {
  return {
    type: GET_MESSAGES_SUCCESS,
    messages
  };
};

export const addMessage = message => {
  return {
    type: ADD_MESSAGE,
    message
  };
};
