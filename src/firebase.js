import React, { useEffect } from 'react'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDQZYBA58U7Xm5V2q0yMpuqvCKcXAtVbVo",
  authDomain: "van-morph-engine.firebaseapp.com",
  projectId: "van-morph-engine",
  storageBucket: "van-morph-engine.appspot.com",
  messagingSenderId: "669932279923",
  appId: "1:669932279923:web:9c00e7393cecd5e8b4b206"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "vans"), where("maxSeats", "==", 6));
const querySnapshot = await getDocs(q);
const vansInDb = []

async function addToDb(formData) {
  const { employee, numSeats, passengers, route } = formData;

  try {
    const docRef = await addDoc(collection(db, "vans"), {
      employee: employee,
      route: route,
      maxSeats: 6,
      numSeats: numSeats,
      passengers: passengers,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data())
  vansInDb.push(doc.data());
});

export { addToDb, vansInDb };


