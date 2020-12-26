import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export function subscribeUserChange(onChange) {
  return auth().onAuthStateChanged(user => onChange(user))
}

export async function signupemail(email, password) {
  console.log('sign up')
  return auth()
    .createUserWithEmailAndPassword(email, password)
}

export async function signinemail(email, password) {
  console.log('signin')
  return auth()
    .signInWithEmailAndPassword(email, password)
}

export async function signout() {
  await auth().signOut()
  console.log('signout')
}

export function subscribeData(userId, setData) {
  try {
    return firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(doc => setData(doc.data()))
  } catch(error) {
    console.log(error)
  }
}

export async function storeData(userId, userData) {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .set(userData)
  } catch(error) {
    console.log(error)
  }
}
