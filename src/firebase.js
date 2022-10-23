import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";

var config = {
  apiKey: "AIzaSyClyjfIsGYEeO2vGZp5Peyc75Ax2SURkPg",
  authDomain: "crypto-babble.firebaseapp.com",
  databaseURL: "https://crypto-babble.firebaseio.com",
  projectId: "crypto-babble",
  storageBucket: "crypto-babble.appspot.com",
  messagingSenderId: "67655670668"
};

export let firebaseApp = firebase.app.length
  ? firebase.initializeApp(config)
  : firebase.app();

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
