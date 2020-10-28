import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_Firebase_Api_Key,
    // authDomain: process.env.VUE_APP_Firebase_Auth_Domain,
    databaseURL: process.env.VUE_APP_Firebase_Database_URL,
    projectId: process.env.VUE_APP_Firebase_Project_Id,
    // storageBucket: process.env.VUE_APP_Firebase_Storage_Bucket,
    // messagingSenderId: process.env.VUE_APP_Firebase_Messaging_Sender_Id,
    appId: process.env.VUE_APP_Firebase_App_Id,
    // measurementId: process.env.VUE_APP_Firebase_Measurement_Id
}

firebase.initializeApp(firebaseConfig);
// firebase.analytics();
let db = firebase.firestore();

export default db;