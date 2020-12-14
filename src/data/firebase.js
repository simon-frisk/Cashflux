import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAifdu6aMhVImca0itoAp7LAJFQHea2178",
  authDomain: "cashflux-cd86a.firebaseapp.com",
  projectId: "cashflux-cd86a",
  storageBucket: "cashflux-cd86a.appspot.com",
  messagingSenderId: "865404205910",
  appId: "1:865404205910:web:059c640caef423593ab4f7"
}

if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export function subscribeUserChange(onChange) {
  return firebase.auth().onAuthStateChanged(user => onChange(user))
}

export function signupananym() {
  return firebase
    .auth()
    .signInAnonymously()
}

export async function linkemail(email, password) {
  const credential = firebase.auth.EmailAuthProvider.credential(email, password)
  await firebase.auth().currentUser.linkWithCredential(credential)
  return firebase.auth().currentUser
}

export async function signinemail(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
}

export async function signout() {
  await firebase.auth().signOut()
}

export async function deleteUser(user) {
  const uid = user.uid
  user.delete()
  db.collection('users').doc(uid).delete()
}

let unsubscribe = () => {}
export async function subscribeData(userId, setData) {
  try {
    unsubscribe()
    unsubscribe = await db
      .collection('users')
      .doc(userId)
      .onSnapshot(doc => setData(doc.data()))
  } catch(error) {
    console.log(error)
  }
}

export function storeData(userId, userData) {
  try {
    db
      .collection('users')
      .doc(userId)
      .set(userData)
  } catch(error) {
    console.log(error)
  }
}
