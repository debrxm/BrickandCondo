import React from "react";
import { firestore } from "../../firebase/config";

const FullProperty = () => {
  const [property, setProperty] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const getProperty = async (propertyID: number) => {
    setIsLoading(true);
    const propertyRef = firestore.collection("properties").doc(`${propertyID}`);
    const snapshot = await propertyRef.get();
    if (snapshot.exists) {
      const data: any = snapshot.data();
      setProperty(data);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    const propertyID: any = localStorage.getItem("propertyID");
    getProperty(propertyID);
  }, [""]);
  return <h1>niceeee</h1>;
};

export default FullProperty;
