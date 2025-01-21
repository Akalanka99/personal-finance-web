// TransactionForm.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Navigate } from "react-router-dom";
import { db } from '../config/firebase-config';
import 'react-datepicker/dist/react-datepicker.css';
import currencyToSymbolMap from 'currency-symbol-map/map';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { collection, doc, setDoc } from "firebase/firestore";
const keyValuePairs = Object.entries(currencyToSymbolMap);

const currencies = keyValuePairs.map(([code, symbol]) => {
  return { code, symbol };
});

const CurrencySelectPopup = ({setOverlayOpen}) => {
    const navigate=useNavigate();
    const { userID } = useGetUserInfo();

    const [selectedCurrency, setSelectedCurrency] = useState('');
    console.log(selectedCurrency)
  


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {

        const userRef = collection(db, "users");

        await setDoc(doc(userRef, userID),{currency: {
          code: selectedCurrency.code,
          symbol: selectedCurrency.symbol
        }});
        // Save the selected currency code and symbol to the collection
    
        // Close the overlay
        setOverlayOpen(false);
      } catch (error) {
        console.error('Error saving currency:', error);
      }
    };
    

  return (
    <div className="bg-white p-8 shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 backdrop-filter backdrop-blur-sm rounded-lg" style={{ width: '250px', height: '250px' }}>
      
      <div className="mb-4">
        {/* Category select */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
        Currency
        </label>
        <select
          value={selectedCurrency.code}
          onChange={(e) => {
            const Currency = currencies.find(curr => curr.code === e.target.value);
            setSelectedCurrency(Currency);
          }}
          className="p-2 border rounded-md w-full"
        >
          <option value="">Select Currency</option>
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              
              {curr.code}
            </option>
          ))}
        </select>
      </div>
     
      {selectedCurrency && (
        <div className="mb-4 flex items-center">
          {/* Display selected category */}
          <span className="mr-2 text-black font-medium">{selectedCurrency.symbol}</span>
          <span className="text-gray-700">{selectedCurrency.code}</span>
        </div>
      )}
     
      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white px-4 py-2 rounded-md w-full"
      >
        Select
      </button>
      
    </div>
  );
};

export default CurrencySelectPopup;
