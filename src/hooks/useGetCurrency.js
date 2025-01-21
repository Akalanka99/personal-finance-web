import { db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetCurrency = () => {

    const { userID } = useGetUserInfo();
    const [currency,setCurrency]=useState('');

    const fetchCurrency = async () => {
        try {
          const docRef = doc(db, "users", userID);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().currency.symbol);
            setCurrency(docSnap.data().currency.symbol);
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        } catch (error) {
          console.error('Error checking user existence:', error);
        }
      };

      useEffect(() => {
        // Fetch budgets when userID changes
        fetchCurrency();
      }, [userID]);
    
      return { currency, setCurrency };      

}
