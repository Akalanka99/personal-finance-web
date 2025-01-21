// BudgetPage.js
import React, { useState, useEffect } from 'react';
import BudgetForm from '../components/Budgets/BudgetForm';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { useGetBudgets } from '../hooks/useGetBudgets';

const BudgetPage = () => {
  const { userID } = useGetUserInfo();
  const { budgets: fetchedBudgets, fetchBudgets } = useGetBudgets();
  const [newBudgets, setNewBudgets] = useState([]);

  useEffect(() => {
    // Fetch budgets when userID changes
    fetchBudgets();
  }, [fetchBudgets, userID]);

  useEffect(() => {
    // Update state when budgets change
    setNewBudgets(fetchedBudgets);
  }, [fetchedBudgets]);

  return (
    <div>
      <h1>Budget Page</h1>
      <BudgetForm userID={userID} />

      {/* Display budget list */}
      {newBudgets.map((budget) => (
        <div key={budget.id}>
          <h2>{budget.category}</h2>
          <p>Budget: ${budget.amount}</p>
          {/* Add logic to check if spending exceeds budget */}
          {/* Display relevant information */}
        </div>
      ))}
    </div>
  );
};

export default BudgetPage;
