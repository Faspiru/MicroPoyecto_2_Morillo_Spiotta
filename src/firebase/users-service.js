import {
  doc,
  collection,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function createUserProfile(userId, data) {
  return setDoc(doc(db, "users", userId), data); // el string es la coleccion que yo cree en firestore
}

export async function getUserProfile(email) {
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const results = await getDocs(userQuery);

  if (results.size > 0) {
    const users = results.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    return users[0];
  } else {
    return null;
  }
}
