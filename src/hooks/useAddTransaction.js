import { addDoc, collection, serverTimestamp,Timestamp } from "firebase/firestore";

import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
    transactionAmount,
    transactionType,
    selectedCategory,
    note,
    date
  }) => {
    const timestamp = date instanceof Date ? Timestamp.fromDate(date) : serverTimestamp();

    await addDoc(transactionCollectionRef, {
      userID,
      transactionAmount,
      transactionType,
      selectedCategory,
      note,
      date: timestamp,
    });
  };
  return { addTransaction };
};

//date
//category
//amount
//type
//note