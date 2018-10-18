import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDeoyUl777fW_kXFwoegs_KXaEgMXau44s',
  authDomain: 'hangman-2aeea.firebaseapp.com',
  databaseURL: 'https://hangman-2aeea.firebaseio.com',
  projectId: 'hangman-2aeea',
  storageBucket: 'hangman-2aeea.appspot.com',
  messagingSenderId: '506850454135'
}
let database = firebase.initializeApp(config).database()

export default database