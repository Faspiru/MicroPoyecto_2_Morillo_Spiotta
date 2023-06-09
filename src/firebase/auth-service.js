import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  singInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";
import { createUserProfile } from "./users-service";

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      await createUserProfile(result.user.uid, {
        email: result.user.email,
        name: result.user.displayName,
        age: 0,
        // aqui iria mas data del usaurio que deberia tener
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const registerWithEmailAndPassword = async (
  email,
  password,
  extraData
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user.uid, {
      email,
      ...extraData,
    });
  } catch (error) {
    console.error(error);
  }
};

// este se usa en el register page y se crea la funcion on submit y mandarle la extra data en el register page

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const result = await singInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

// llamo a esa funcion en el estado de login

export const singInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await singInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

// Esta de logout creo una funcion en el header y ahi es donde se va a utilizar.
