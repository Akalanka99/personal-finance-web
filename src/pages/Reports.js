import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import { useGetTransactions } from '../hooks/useGetTransactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import _ from 'lodash';
import { useGetCurrency } from '../hooks/useGetCurrency';



const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const { transactions, transactionTotals } = useGetTransactions();
  const {currency}=useGetCurrency();
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  



  return (
    <Layout>
      <h1 className='text-3xl font-semibold text-gray-800'>REPORTS</h1>
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
                {currentTransactions.map((transaction, index) => (
                  
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    {console.log(transaction)}
                    <td className="px-4 py-2 font-medium">{moment(transaction.date.toDate()).format('DD MMM')}</td>
                    <td className="px-4 py-2 flex items-center">
                      <FontAwesomeIcon icon={transaction.selectedCategory.icon} className="mr-2 text-gray-400" />
                      {transaction.selectedCategory.name}
                    </td>
                    <td className="px-4 py-2">{currency} {transaction.transactionAmount}</td>
                    <td className={`px-4 py-2 text-center`}>
                      {_.capitalize(transaction.transactionType)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 rounded-md ${currentPage === index + 1 ? 'bg-purple-500 text-white' : 'hover:bg-gray-300 bg-gray-200'}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>  
          </div>
      
    </Layout>
  );
};

export default Reports;
