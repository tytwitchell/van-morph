import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

import { firebaseConfig } from "../firestore-config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const q = query(collection(db, "vans"), where("maxSeats", "==", 6));
const querySnapshot = await getDocs(q);


const vansInDb = [];

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
  const vanData = {
    docId: doc.id,
    ...doc.data(),
  };
  vansInDb.push(vanData);
});

async function handleAddNewPassenger(draggedPassenger, targetVan) {
  const newPassengers = [...targetVan.passengers, draggedPassenger];

  // console.log("Document ID: ", targetVan.docId);

  try {
    const vanDocRef = doc(db, "vans", targetVan.docId);

    await updateDoc(vanDocRef, {
      passengers: newPassengers,
    });
    console.log("Document updated for ID: ", targetVan.docId);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

async function handleRemovePassenger(draggedVan, draggedPassenger) {
  const newPassengers = draggedVan.passengers.filter(
    (passenger) => passenger.uuid !== draggedPassenger.uuid
  );

  console.log(newPassengers, ...newPassengers);

  try {
    const vanDocRef = doc(db, "vans", draggedVan.docId);

    await updateDoc(vanDocRef, {
      passengers: newPassengers,
    });

    console.log("Document written with ID: ", draggedVan.docId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// doc(db, "vans", targetVan.id);
// console.log(targetVan, draggedPassenger);

// /////////////// Next: figure out how to make updateDoc work in handleAddNewPassenger /////////

export { addToDb, vansInDb, handleAddNewPassenger, handleRemovePassenger };
