import { firestore } from "./config";

export const CreateProperty = async (data: any, cleanUp: any) => {
  const productRef = firestore.doc(`properties/${data.id}`);
  try {
    await productRef.set(data);
    cleanUp();
  } catch (error: any) {
    console.log("error creating product", error.message);
  }
};
