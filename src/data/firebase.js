import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAifdu6aMhVImca0itoAp7LAJFQHea2178",
  authDomain: "cashflux-cd86a.firebaseapp.com",
  projectId: "cashflux-cd86a",
  storageBucket: "cashflux-cd86a.appspot.com",
  messagingSenderId: "865404205910",
  appId: "1:865404205910:web:059c640caef423593ab4f7"
};

firebase.initializeApp(firebaseConfig)

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