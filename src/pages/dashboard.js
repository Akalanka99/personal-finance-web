import React from 'react';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useGetTransactions } from '../hooks/useGetTransactions';
import ExpenseChart from '../components/ExpenseChart';
import IncomeExpenseLineGraph from '../components/IncomeExpenseLineGraph';
import moment from 'moment';
import _ from 'lodash';
import { useState } from 'react';
import CurrencySelectPopup from '../components/CurrencySelectPopup';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { db } from '../config/firebase-config';
import { useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const { transactions, transactionTotals } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { userID } = useGetUserInfo();
  const[currency,setCurrency]=useState('');

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().currency.symbol);
          setCurrency(docSnap.data().currency.symbol);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          setOverlayOpen(true);
        }
      } catch (error) {
        console.error('Error checking user existence:', error);
      }
    };

    checkUserExists();
  }, [userID]);

  return (
    <Layout>
      <div className='container mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold text-gray-800'>DASHBOARD</h1>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3'>
          <div className='bg-gray-500 rounded-lg p-6 text-white'>
            <h3 className='text-lg font-semibold mb-4'>BALANCE</h3>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faWallet} className='text-2xl' />
              <h1 className='text-2xl ml-2'>{currency} {balance}</h1>
            </div>
          </div>
          <div className='bg-green-500 rounded-lg p-6 text-white'>
            <h3 className='text-lg font-semibold mb-4'>INCOME</h3>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faArrowUp} className='text-2xl' />
              <h1 className='text-2xl ml-2'>{currency} {income}</h1>
            </div>
          </div>
          <div className='bg-rose-500 rounded-lg p-6 text-white'>
            <h3 className='text-lg font-semibold mb-4'>EXPENSE</h3>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faArrowDown} className='text-2xl' />
              <h1 className='text-2xl ml-2'>{currency} {expenses}</h1>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
          <div className='bg-white rounded-lg p-6'>
            <ExpenseChart />
          </div>
          <div className='bg-white rounded-lg p-6'>
            <IncomeExpenseLineGraph />
          </div>
        </div>

        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
              <thead className="bg-gray-500">
                <tr>
                  <th className="px-4 py-2 text-left">DATE</th>
                  <th className="px-4 py-2 text-left">CATEGORY</th>
                  <th className="px-4 py-2 text-left">AMOUNT</th>
                  <th className="px-4 py-2 text-center">TRANSACTION TYPE</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {transactions.map((transaction, index) => (
                  
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    {console.log(transaction)}
                    <td className="px-4 py-2 font-medium">{moment(transaction.date.toDate()).format('DD MMM')}</td>
                    <td className="px-4 py-2 flex items-center">
                      <FontAwesomeIcon icon={transaction.selectedCategory.icon} className="mr-2 text-gray-400" />
                      {transaction.selectedCategory.name}
                    </td>
                    <td className="px-4 py-2">{currency} {transaction.transactionAmount}</td>
                    <td className={`px-4 py-2 text-center ${transaction.transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                      {_.capitalize(transaction.transactionType)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {overlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <CurrencySelectPopup setOverlayOpen={setOverlayOpen}/>
          </div>
        </div>
      )}    
    </Layout>
  );
};

export default Dashboard;
