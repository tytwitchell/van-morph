// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs
// } from "firebase/firestore";

// import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDQZYBA58U7Xm5V2q0yMpuqvCKcXAtVbVo",
  authDomain: "van-morph-engine.firebaseapp.com",
  projectId: "van-morph-engine",
  storageBucket: "van-morph-engine.appspot.com",
  messagingSenderId: "669932279923",
  appId: "1:669932279923:web:9c00e7393cecd5e8b4b206",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const q = query(collection(db, "vans"), where("maxSeats", "==", 6));
// const querySnapshot = await getDocs(q);


export { firebaseConfig };