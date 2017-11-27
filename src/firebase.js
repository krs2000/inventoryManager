 import * as firebase from 'firebase';



 var config = {
    apiKey: "AIzaSyBqglClNBtcFXBVo_oHvpHnONjI6S64X3c",
    authDomain: "inventorymanager-a818b.firebaseapp.com",
    databaseURL: "https://inventorymanager-a818b.firebaseio.com",
    projectId: "inventorymanager-a818b",
    storageBucket: "inventorymanager-a818b.appspot.com",
    messagingSenderId: "72864239917"
  };



 export const firebaseApp = firebase.initializeApp(config);

//   export const goalRef = firebase.database().ref('goals');
    


export const itemsRef = firebase.database().ref("items");