import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_Firebase_Api_Key,
    authDomain: process.env.REACT_APP_Firebase_Auth_Domain,
    databaseURL: process.env.REACT_APP_Firebase_Database_URL,
    projectId: process.env.REACT_APP_Firebase_Project_Id,
    storageBucket: process.env.REACT_APP_Firebase_Storage_Bucket,
    messagingSenderId: process.env.REACT_APP_Firebase_Messaging_Sender_Id,
    appId: process.env.REACT_APP_Firebase_App_Id,
    measurementId: process.env.REACT_APP_Firebase_Measurement_Id
}

firebase.initializeApp(firebaseConfig);
// firebase.analytics();
let db = firebase.firestore();

export default db;