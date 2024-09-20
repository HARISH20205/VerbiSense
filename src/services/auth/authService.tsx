import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { AuthUserModel } from "../../models/auth/AuthUserModel";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function logout() {
  try {
    await signOut(auth);
  } catch (e) {}
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential | null> {
  try {
    const userCrendential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCrendential;
  } catch (e) {
    return null;
  }
}

export async function signup(
  userName: string,
  email: string,
  password: string
): Promise<UserCredential | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      userName: userName,
    });
    return userCredential;
  } catch (e) {
    return null;
  }
}

export async function getUser(uid: string): Promise<AuthUserModel | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const authUser: AuthUserModel = {
        email: userData.email,
        id: uid,
        userName: userData.userName,
      };
      return authUser;
    }
    return null;
  } catch (e) {
    return null;
  }
}
