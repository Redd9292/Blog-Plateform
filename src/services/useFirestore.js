import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export async function useFirestore(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message);
  }
}
