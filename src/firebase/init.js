import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyDwUBlWMSGKtowiIbtg3Gemsza4R-kzF7A",
  authDomain: "rezolution-team.firebaseapp.com",
  databaseURL: "https://rezolution-team.firebaseio.com",
  projectId: "rezolution-team",
  storageBucket: "",
  messagingSenderId: "482817511111",
  appId: "1:482817511111:web:8b4c3a92ddf8ef5f"
};

const fireBaseApp = firebase.initializeApp(config);

const auth = fireBaseApp.auth();
const db = fireBaseApp.firestore();

export { auth, db }