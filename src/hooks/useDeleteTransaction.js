import { deleteDoc, doc } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";

export const useDeleteTransaction = () => {
  const { userID } = useGetUserInfo();

  const deleteTransaction = async (transactionId) => {
    try {
      const transactionRef = doc(db, "transactions", transactionId);

      // Delete the transaction document
      await deleteDoc(transactionRef);
      console.log("Transaction deleted successfully.");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return { deleteTransaction };
};
