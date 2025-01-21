import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

const useGetSpentAmount = () => {
  const [spentAmounts, setSpentAmounts] = useState({});
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const fetchSpentAmounts = async () => {
      if (!userID) {
        console.warn('userID is not available.');
        return;
      }

      try {
        const expenseCollectionRef = collection(db, 'transactions');
        const queryExpenses = query(
          expenseCollectionRef,
          where('userID', '==', userID),
          where('transactionType', '==', 'expense')
        );

        const snapshot = await getDocs(queryExpenses);
        const spentAmountsData = {};

        snapshot.forEach(doc => {
          const data = doc.data();
          const { selectedCategory, transactionAmount, date } = data;
          const categoryName = selectedCategory.name;

          // Check if the transaction date falls within the current month
          const transactionDate = new Date(date.seconds * 1000); // Convert Firestore timestamp to JavaScript Date object
          const currentDate = new Date();
          if (transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear()) {
            if (spentAmountsData[categoryName]) {
              spentAmountsData[categoryName] += Number(transactionAmount);
            } else {
              spentAmountsData[categoryName] = Number(transactionAmount);
            }
          }
        });

        console.log('Spent amounts data:', spentAmountsData);
        setSpentAmounts(spentAmountsData);
      } catch (error) {
        console.error('Error fetching spent amounts:', error);
      }
    };

    fetchSpentAmounts();
  }, [userID]);

  return { spentAmounts };
};

export default useGetSpentAmount;
