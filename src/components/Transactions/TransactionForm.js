// TransactionForm.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import categories from './categories';
import { useAddTransaction } from '../../hooks/useAddTransaction';

import 'react-datepicker/dist/react-datepicker.css';

const TransactionForm = ({ onClose }) => {
  const { addTransaction } = useAddTransaction();
  const [date, setDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactionAmount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    // Handle form submission here..
    let transactionType;

    e.preventDefault();
    console.log(selectedCategory.name);
    
    if(selectedCategory.name=='Income'){

      transactionType="income";

    }
    else{

      transactionType="expense";
    }
    addTransaction({
      transactionAmount,
      transactionType,
      selectedCategory,
      note,
      date: date || new Date(),
    });

    // Clear form
    setDate(new Date());
    setSelectedCategory('');
    setAmount('');
    setNote('');

    // Close the form
    onClose();
  };

  return (
    <div className="bg-white p-8 shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700" style={{ width: '600px', height: '500px' }}>
      <div className="mb-4">
        {/* Date input */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date
        </label>
        <DatePicker selected={date} onChange={(newDate) => setDate(newDate)} className="p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        {/* Category select */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            const selectedCategory = categories.find(cat => cat.name === e.target.value);
            setSelectedCategory(selectedCategory);
          }}
          className="p-2 border rounded-md w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              <FontAwesomeIcon icon={cat.icon} className="mr-2" />
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && (
        <div className="mb-4 flex items-center">
          {/* Display selected category */}
          <FontAwesomeIcon icon={selectedCategory.icon} className="mr-2 text-gray-400" />
          <span className="text-gray-700">{selectedCategory.name}</span>
        </div>
      )}
      <div className="mb-4">
        {/* Amount input */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          value={transactionAmount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        {/* Note input */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Note
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          className="p-2 border rounded-md w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white px-4 py-2 rounded-md w-full"
      >
        Add Transaction
      </button>
      <button
        onClick={onClose}
        className="text-gray-500 mt-4"
      >
        Cancel
      </button>
    </div>
  );
};

export default TransactionForm;
