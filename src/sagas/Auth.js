import firebase from "firebase";
import rsf from "../firebase";

import { takeLatest } from "redux-saga";
import { call, put } from "redux-saga/lib/effects";

import { signInSuccessful, signOutSuccessful } from "../actions/Auth";

const fbAuthProvider = new firebase.auth.FacebookAuthProvider();

function signIn(provider) {
  return firebase.auth().signInWithPopup(provider);
}

function* initiateSignIn() {
  try {
    const { user } = yield call(signIn, fbAuthProvider);
    console.log(user);
    yield put(signInSuccessful(user));
  } catch (error) {
    console.log("SIGN IN ERROR: ", error);
  }
}

function* initiateSignOut() {
  try {
    const signOut = yield call(rsf.auth.signOut);
    yield put(signOutSuccessful);
  } catch (error) {
    console.log("SIGN OUT ERROR: ", error);
  }
}

export function* authWatcherSaga() {
  yield takeLatest("INITIATE_FB_SIGN_IN", initiateSignIn);
  yield takeLatest("INITTIATE_SIGN_OUT", initiateSignOut);
}
