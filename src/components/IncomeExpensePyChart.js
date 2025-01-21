import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

import { useGetTransactions } from "../hooks/useGetTransactions";
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const { transactions, transactionTotals } = useGetTransactions();

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [transactionTotals.income, transactionTotals.expenses],
        backgroundColor: ["rgba(75,192,192,0.7)", "rgba(255,99,132,0.7)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Transaction Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default TransactionChart;