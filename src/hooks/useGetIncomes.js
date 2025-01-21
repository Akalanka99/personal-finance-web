// useGetIncome.js
import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const incomeCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const getIncome = async () => {
      if (!userID) {
        console.warn("userID is not available.");
        return;
      }

      try {
        const queryIncome = query(
          incomeCollectionRef,
          where("userID", "==", userID),
          where("transactionType", "==", "income"),
          orderBy("date")
        );

        const unsubscribe = onSnapshot(queryIncome, (snapshot) => {
          let incomeMap = new Map(); // Using Map to aggregate income by category name
          let totalIncomeAmount = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            // Accessing category name from the selectedCategory object
            const categoryName = data.selectedCategory.name;
            const amount = Number(data.transactionAmount);
            totalIncomeAmount += amount;

            if (incomeMap.has(categoryName)) {
              incomeMap.set(categoryName, incomeMap.get(categoryName) + amount);
            } else {
              incomeMap.set(categoryName, amount);
            }
          });

          // Convert aggregated data into an array of objects
          const incomeList = Array.from(incomeMap, ([name, amount]) => ({ name, amount }));

          setIncomes(incomeList);
          setTotalIncome(totalIncomeAmount);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching income:", err);
      }
    };

    getIncome();
  }, [userID]);

  return { incomes, totalIncome };
};
