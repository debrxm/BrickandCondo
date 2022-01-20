import { firestore } from "./config";

export const CreateProduct = async (data: any) => {
  const productRef = firestore.doc(`product/${data.id}`);
  try {
    await productRef.set(data);
  } catch (error: any) {
    console.log("error creating product", error.message);
  }
};
