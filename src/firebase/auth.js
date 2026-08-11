import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

export const registerUser = async ({ name, email, password }) => {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credentials.user, { displayName: name });
  return credentials.user;
};

export const loginUser = async ({ email, password }) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
};

export const logoutUser = () => signOut(auth);

export const subscribeToAuthChanges = (callback) => onAuthStateChanged(auth, callback);
