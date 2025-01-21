import { useEffect, useState } from "react";
import {query,collection,where,orderBy,onSnapshot} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactionsFiltered = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactionsByDateRange = async (dateRange) => {
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
        let expenseList = [];
        let totalExpensesAmount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          expenseList.push({ ...data, id });
          totalExpensesAmount += Number(data.transactionAmount);
        });

        setExpenses(expenseList);
        setTotalExpenses(totalExpensesAmount);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("date","desc")
      );
      console.log(queryTransactions);

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

          console.log(totalExpenses, totalIncome);
        });

        console.log(docs);

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;
        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};