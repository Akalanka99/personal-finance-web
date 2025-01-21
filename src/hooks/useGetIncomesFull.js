import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { subMonths } from 'date-fns';

export const useGetIncomeFull = () => {
  const [incomes, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const incomeCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getIncomesByDateRange = async (dateRange) => {
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
      const queryIncome = query(
        incomeCollectionRef,
        where("userID", "==", userID),
        where("transactionType", "==", "income"),
        where("date", ">=", startDate),
        where("date", "<=", endDate),
        orderBy("date")
      );

      const unsubscribe = onSnapshot(queryIncome, (snapshot) => {
        let incomeList = [];
        let totalIncomeAmount = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          incomeList.push({ ...data, id });
          totalIncomeAmount += Number(data.transactionAmount);
        });

        setIncome(incomeList);
        setTotalIncome(totalIncomeAmount);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    if (userID) {
      getIncomesByDateRange("lastMonth"); // Default to last month
    }
  }, [userID]);

  return { incomes, totalIncome, getIncomesByDateRange };


};