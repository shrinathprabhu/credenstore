import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    databaseURL: process.env.VUE_APP_Firebase_Database_URL,
    projectId: process.env.VUE_APP_Firebase_Project_Id,
}

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;