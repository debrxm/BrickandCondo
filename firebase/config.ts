import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYHBgb5Xsv04EbqALwAQd1bvbp4wmXdms",

  authDomain: "brick-condo.firebaseapp.com",

  projectId: "brick-condo",

  storageBucket: "brick-condo.appspot.com",

  messagingSenderId: "810757523134",

  appId: "1:810757523134:web:28f951490af3baf18000ef",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();

export default firebase;
