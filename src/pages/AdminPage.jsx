import React from "react";
import { useUser } from "../contexts/UserContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function AdminPage() {
  const { user } = useUser();

  async function getAllDocuments() {
    const documentsArray = [];

    const collectionRef = collection(db, "reserves", "385687", "costumers");
    const costumberQuery = query(collectionRef, where("UserId", "==", user.id));
    const querySnapshot = await getDocs(costumberQuery);

    querySnapshot.forEach((doc) => {
      documentsArray.push(doc.data());
      console.log(doc.data());
    });

    console.log(documentsArray);
  }

  getAllDocuments();

  return <div>AdminPage</div>;
}
