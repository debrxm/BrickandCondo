import firebase, { auth, firestore } from "./config";

export const createUserProfile = async (userAuth: any) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email, displayName, uid } = userAuth;
    console.log(userAuth);

    const createdAt = Date.now();
    const userData = {
      id: uid,
      displayName: displayName ? displayName : "John Doe",
      email,
      createdAt: createdAt,
    };
    try {
      await userRef.set(userData);
    } catch (error: any) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
