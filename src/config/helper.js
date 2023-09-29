import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export function getData(collectionName, userId) {
  return new Promise((resolve, reject) => {
    try {
      const collectionRef = collection(db, collectionName);
      const queryOptions = [
        where("userId", "==", userId),
        orderBy("record", "desc"),
      ];
      const userQuery = query(collectionRef, ...queryOptions);

      // Using onSnapshot to get real-time updates
      const unsubscribe = onSnapshot(userQuery, (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        resolve(data);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error(`Error getting data from collection "${collectionName}":`, error);
      reject(error);
    }
  });
}
