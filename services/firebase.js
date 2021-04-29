import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Get a Firestore instance
const firebaseConfig = {
  apiKey: 'AIzaSyBEkVAZV71_i7_0u97Fgaj8ODquD_kLXBQ',
  authDomain: 'shopapp-308706.firebaseapp.com',
  projectId: 'shopapp-308706',
  storageBucket: 'shopapp-308706.appspot.com',
  messagingSenderId: '894386807325',
  appId: '1:894386807325:web:296658a0f2ab262bba5cf4',
  measurementId: 'G-PSRVKNEVZV'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
db.settings({ ignoreUndefinedProperties: true })
export const firebaseIns = firebase
export const Auth = firebase.auth()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()

if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', 8080)
}
