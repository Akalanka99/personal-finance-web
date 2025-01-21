import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionForm from '../components/Transactions/TransactionForm';
import "react-datepicker/dist/react-datepicker.css";
import { useGetTransactions } from '../hooks/useGetTransactions';

const TransactionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const transactionsPerPage = 10;

  const { transactions } = useGetTransactions();


  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleForm = () => {
    setShowForm(!showForm);
    setOverlayOpen(!overlayOpen);
  }

  return (
    <Layout>
      <div className={`container mx-auto p-6 ${overlayOpen ? 'overflow-hidden' : ''}`}>
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold text-gray-800'> TRANSACTIONS</h1>
          <div>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-md mb-4"
              onClick={toggleForm}
            >
              Add Transaction
            </button>
            <TransactionList transactions={currentTransactions} />
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
        </div>
      </div>
      {overlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <TransactionForm onClose={toggleForm} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TransactionPage;
