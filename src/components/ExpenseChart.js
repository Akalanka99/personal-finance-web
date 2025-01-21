// ExpenseChart.js
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useGetExpenses } from "../hooks/useGetExpenses";

const ExpenseChart = () => {
  const { expenses, totalExpenses, getExpensesByDateRange } = useGetExpenses();
  const [selectedDateRange, setSelectedDateRange] = useState("lastMonth");

  useEffect(() => {
    getExpensesByDateRange(selectedDateRange);
  }, [selectedDateRange]);

  const handleDateRangeChange = (event) => {
    setSelectedDateRange(event.target.value);
  };

  const chartData = {
    labels: expenses.map((expense) => expense.name),
    datasets: [
      {
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          "rgba(0, 123, 255, 0.7)", // Blue
          "rgba(102, 16, 242, 0.7)", // Purple
          "rgba(220, 53, 69, 0.7)", // Red
          "rgba(40, 167, 69, 0.7)", // Green
          "rgba(255, 193, 7, 0.7)", // Yellow
          "rgba(23, 162, 184, 0.7)", // Teal
          "rgba(253, 126, 20, 0.7)", // Orange
          "rgba(111, 66, 193, 0.7)", // Indigo
          "rgba(232, 62, 140, 0.7)", // Pink
          "rgba(32, 201, 151, 0.7)", // Cyan
          "rgba(52, 58, 64, 0.7)", // Dark
          "rgba(173, 181, 189, 0.7)", // Gray
          // Add more colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Expense by Category',
        font: {
          size: 20,
        },
      },
    }
  };

  return (
    <div>
      <div className="text-gray-800">
        <select value={selectedDateRange} onChange={handleDateRangeChange}>
          <option value="lastMonth">Last Month</option>
          <option value="lastTwoMonths">Last Two Months</option>
          <option value="lastThreeMonths">Last Three Months</option>
          <option value="lastSixMonths">Last Six Months</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
      <div style={{ width: '100%', height: '100%', marginTop: "5px", paddingBottom: "10%", paddingLeft: "10%", paddingRight: "10%", background: "#FFFFFF", border: "2px solid #FFFFFF", boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.06)", borderRadius: "20px" }}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExpenseChart;
