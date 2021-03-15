import Firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCm_pOXDaPi9Z8XylfGDr7ggj5vydtuZ0s",
  authDomain: "thewave-e9864.firebaseapp.com",
  databaseURL: "https://thewave-e9864-default-rtdb.firebaseio.com",
  projectId: "thewave-e9864",
  storageBucket: "thewave-e9864.appspot.com",
  messagingSenderId: "853962632751",
  appId: "1:853962632751:web:7e3ba8e649a4605ceb60da",
  measurementId: "G-YK3KJBY6JL"
};
  // Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app;
