import firebase, { firestore } from "./config";

export const CreateProperty = async (data: any, cleanUp: any) => {
  const productRef = firestore.doc(`properties/${data.id}`);
  try {
    await productRef.set(data);
    cleanUp();
  } catch (error: any) {
    console.log("error creating property", error.message);
  }
};
export const UpdateProperty = async (data: any, cleanUp: any) => {
  const productRef = firestore.doc(`properties/${data.id}`);
  try {
    await productRef.update(data);
    cleanUp();
  } catch (error: any) {
    console.log("error updating property", error.message);
  }
};
const deleteFile = (pathToFile: string, fileName: string) => {
  const ref = firebase.storage().ref(pathToFile);
  const childRef = ref.delete();
  // childRef.delete();
};
// const onDeletePropertyImage = async (id: number, anchor: string) => {
const onDeletePropertyImage = async (id: number) => {
  const storageRef = firebase.storage().ref(`properties/${id}`);
  storageRef
    .listAll()
    .then((dir) => {
      dir.items.forEach((fileRef) => {
        deleteFile(storageRef.fullPath, fileRef.name);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
let cleared: boolean = false;
// const checkImages = (data: any) => {
//   if (data.images.main) {
//     onDeletePropertyImage(data.id, "main");
//   } else if (data.images.sub_image_one) {
//     onDeletePropertyImage(data.id, "subImageOne");
//   } else if (data.images.sub_image_two) {
//     onDeletePropertyImage(data.id, "subImageTwo");
//   } else if (data.images.other_images.length) {
//     data.images.other_images.forEach((element: string, index: number) => {
//       onDeletePropertyImage(data.id, `otherImages-${index}`);
//     });
//   } else {
//     cleared = true;
//   }
// };
export const DeleteProperty = async (data: any, cleanUp: any) => {
  // if (!cleared) {
  onDeletePropertyImage(data.id);
  // checkImages(data);
  // }
  const productRef = firestore.doc(`properties/${data.id}`);
  try {
    await productRef.delete();
    cleanUp();
  } catch (error: any) {
    console.log("error deleting property", error.message);
  }
};
