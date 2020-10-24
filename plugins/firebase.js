import * as firebase from 'firebase/app'
import 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDWsufelpETP0UH1SfGDx_LIc2HgU8_nMk",
    authDomain: "vuefirebase-65c7e.firebaseapp.com",
    databaseURL: "https://vuefirebase-65c7e.firebaseio.com",
    projectId: "vuefirebase-65c7e",
    storageBucket: "vuefirebase-65c7e.appspot.com",
    messagingSenderId: "820675737205",
    appId: "1:820675737205:web:6c383a836505b625c6aa3c"
  };
let app =null;
if (!firebase.app.length){
  app=firestore.initializeApp(firebaseConfig);
}

export default firebase
