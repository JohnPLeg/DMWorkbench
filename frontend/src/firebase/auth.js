import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { app } from './config';

export const auth = getAuth(app);

export const loginWithEmail = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};