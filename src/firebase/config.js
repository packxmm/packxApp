import * as firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA_VyuZQeY4wrfhN_K2OwYNLew9-cOxVtg",
  authDomain: "packx-e600f.firebaseapp.com",
  projectId: "packx-e600f",
  storageBucket: "packx-e600f.appspot.com",
  messagingSenderId: "733915356363",
  appId: "1:733915356363:web:1b61f505a3e59988014f4e",
  measurementId: "G-GWM7HCQNQY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
