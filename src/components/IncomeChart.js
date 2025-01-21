// IncomeChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { useGetIncome } from "../hooks/useGetIncomes";

const IncomeChart = () => {
  const { incomes, totalIncome } = useGetIncome();

  const chartData = {
    labels: incomes.map((income) => income.name),
    datasets: [
      {
        data: incomes.map((income) => income.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Income Chart</h2>
      <p>Total Income: ${totalIncome.toFixed(2)}</p>
      <Pie data={chartData} />
    </div>
  );
};

export default IncomeChart;
