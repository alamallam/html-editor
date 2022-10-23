import firebase from "firebase";
import rsf, { firebaseApp } from "../firebase";

import { takeLatest } from "redux-saga";
import { take, put, call, all, takeEvery, fork } from "redux-saga/lib/effects";

import {
  syncMessages,
  failedMessages,
  getMessages,
  ADD_MESSAGE,
  SYNC_MESSAGES,
  MESSAGES_SUBSCRIBE,
  GET_MESSAGES,
  getMessagesSuccess
} from "../actions/Chat";

function* syncMessagesSaga() {
  const channel = rsf.firestore.channel(
    firebase
      .firestore(firebaseApp)
      .collection("messages")
      .orderBy("submit_at")
  );

  while (true) {
    const messages = yield take(channel);
    let messagesArray = [];
    messages.forEach(function(message) {
      messagesArray.push(message.data());
    });
    yield put(syncMessages(messagesArray));
  }
}

function* addMessageSaga(m) {
  const { message } = m;
  try {
    const doc = yield call(rsf.firestore.addDocument, "messages", message);
  } catch (error) {
    console.log(error);
  }
}

export default function* chatWatcherSaga() {
  yield all([
    // call(syncMessagesSaga),
    takeLatest(GET_MESSAGES, syncMessagesSaga),
    takeEvery(ADD_MESSAGE, addMessageSaga)
  ]);
}
