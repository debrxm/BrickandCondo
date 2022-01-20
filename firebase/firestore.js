import { firestore } from "./config";

export const CreateProduct = async (data) => {
  const productRef = firestore.doc(`product/${data.id}`);
  try {
    await productRef.set(data);
  } catch (error) {
    console.log("error creating product", error.message);
  }
};
