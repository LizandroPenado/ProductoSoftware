import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA1d-4jiYKtN2EWIy-AOkC2XGqRfOT4030",
  authDomain: "buscador-repuestos.firebaseapp.com",
  projectId: "buscador-repuestos",
  storageBucket: "buscador-repuestos.appspot.com",
  messagingSenderId: "1091977589740",
  appId: "1:1091977589740:web:4d2e8340c84bab489a46c9",
  measurementId: "G-PQKY56ER08"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }
