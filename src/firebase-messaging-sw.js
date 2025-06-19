importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyCNxodJX_CDCPIXXJ-9m8Uy7YsbijLiMuE",
  authDomain: "bloggingapp-9da39.firebaseapp.com",
  projectId: "bloggingapp-9da39",
  storageBucket: "bloggingapp-9da39.firebasestorage.app",
  messagingSenderId: "166408561515",
  appId: "1:166408561515:web:f02cba698e794f4938e22e",
  measurementId: "G-KT2S7YSNNJ"
})
const message=firebase.messaging();