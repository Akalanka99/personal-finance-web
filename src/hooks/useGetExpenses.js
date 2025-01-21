// useGetExpenses.js
import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { subMonths } from 'date-fns';

export const useGetExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { userID } = useGetUserInfo();

  const expenseCollectionRef = collection(db, "transactions");

  const getExpensesByDateRange = async (dateRange) => {
    let startDate, endDate;

    const currentDate = new Date();

    switch (dateRange) {
      case "lastMonth":
        startDate = subMonths(currentDate, 1);
        endDate = currentDate;
        break;
      case "lastTwoMonths":
        startDate = subMonths(currentDate, 2);
        endDate = currentDate;
        break;
      case "lastThreeMonths":
        startDate = subMonths(currentDate, 3);
        endDate = currentDate;
        break;
      case "lastSixMonths":
        startDate = subMonths(currentDate, 6);
        endDate = currentDate;
        break;
      case "lastYear":
        startDate = subMonths(currentDate, 12);
        endDate = currentDate;
        break;
      default:
        break;
    }

    try {
      const queryExpenses = query(
        expenseCollectionRef,
        where("userID", "==", userID),
        where("transactionType", "==", "expense"),
        where("date", ">=", startDate),
        where("date", "<=", endDate),
        orderBy("date")
      );

      const unsubscribe = onSnapshot(queryExpenses, (snapshot) => {
        let expenseMap = new Map();
        let totalExpensesAmount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          const categoryName = data.selectedCategory.name;
          const amount = Number(data.transactionAmount);
          totalExpensesAmount += amount;

          if (expenseMap.has(categoryName)) {
            expenseMap.set(categoryName, expenseMap.get(categoryName) + amount);
          } else {
            expenseMap.set(categoryName, amount);
          }
        });

        const expenseList = Array.from(expenseMap, ([name, amount]) => ({ name, amount }));
        setExpenses(expenseList);
        setTotalExpenses(totalExpensesAmount);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    if (userID) {
      getExpensesByDateRange("lastMonth"); // Default to last month
    }
  }, [userID]);

  return { expenses, totalExpenses, getExpensesByDateRange };
};
