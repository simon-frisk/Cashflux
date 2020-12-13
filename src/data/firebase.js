import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAifdu6aMhVImca0itoAp7LAJFQHea2178",
  authDomain: "cashflux-cd86a.firebaseapp.com",
  projectId: "cashflux-cd86a",
  storageBucket: "cashflux-cd86a.appspot.com",
  messagingSenderId: "865404205910",
  appId: "1:865404205910:web:059c640caef423593ab4f7"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export function signupananym() {
  return firebase
    .auth()
    .signInAnonymously()
}

export function signupemail(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
}

export function signinemail(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

export function signout() {
  firebase.auth().signOut()
}

export function subscribeData(userId, setData) {
  try {
    db
    .collection('users')
    .doc(userId)
    .onSnapshot(doc => setData(doc.data()))
  } catch(error) {
    console.log(error)
  }
}

export function storeData(userId, userData) {
  db
    .collection('users')
    .doc(userId)
    .set(userData)
}
