// src/components/Transaction.js
import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon
import _ from 'lodash';
import { useDeleteTransaction } from '../../hooks/useDeleteTransaction';
import { useGetCurrency } from '../../hooks/useGetCurrency';
const Transaction = ({ transaction }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { deleteTransaction } = useDeleteTransaction();
  const {currency}=useGetCurrency();
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteTransaction(transaction.id); // Pass the transaction ID to the delete function
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <tr className='hover:bg-gray-100 transition-all'>
      <td className='font-medium py-2 px-2'>{moment(transaction.date.toDate()).format('DD MMM')}</td>
      <td><FontAwesomeIcon icon={transaction.selectedCategory.icon} className="mr-2 text-gray-400" />{transaction.selectedCategory.name}</td>
      <td>{currency} {transaction.transactionAmount}</td>
      <td className={`text-center`}><span className={``}>{_.capitalize(transaction.transactionType)}</span></td>
      <td className="relative">{transaction.note}<button onClick={handleDeleteClick} className="absolute top-0 right-0 mt-1 mr-1 text-red-500">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button></td>
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p className="mb-4">Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end">
              <button onClick={handleConfirmDelete} className="mr-2 bg-purple-500 text-white px-4 py-2 rounded-md">Delete</button>
              <button onClick={handleCancelDelete} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default Transaction;
