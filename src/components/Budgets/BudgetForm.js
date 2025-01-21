// BudgetForm.js
import React, { useState } from 'react';
import { useAddBudget } from '../../hooks/useAddBudget';

const BudgetForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const { addBudget } = useAddBudget();

  const handleSaveBudget = () => {
    if (!category || !amount) {
      alert('Please fill in all fields');
      return;
    }

    addBudget({ category, amount });
    setCategory('');
    setAmount('');
  };

  return (
    <div>
      <h2>Add Budget</h2>
      <form>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSaveBudget}>
          Save Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
