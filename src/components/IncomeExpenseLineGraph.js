import React, { useState, useEffect } from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import moment from 'moment';
import { useGetExpensesFull } from '../hooks/useGetExpensesFull';
import { useGetIncomeFull } from '../hooks/useGetIncomesFull';
import { useGetCurrency } from '../hooks/useGetCurrency';


ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function IncomeExpenseLineGraph() {
    const { incomes,getIncomesByDateRange } = useGetIncomeFull();
    const { expenses ,getExpensesByDateRange} = useGetExpensesFull()
    const [selectedDateRange, setSelectedDateRange] = useState("lastMonth");
    const [chartData, setChartData] = useState(getInitialChartData());
    const {currency}=useGetCurrency();
    useEffect(() => {
        // Update chart data whenever transactions, incomes, or expenses change
        setChartData(getUpdatedChartData());
    }, [incomes, expenses,selectedDateRange]);

    const handleDateRangeChange = (event) => {

        setSelectedDateRange(event.target.value);
        getExpensesByDateRange(event.target.value);
        getIncomesByDateRange(event.target.value);
      };

    function getInitialChartData() {
        return {
            labels: [],
            datasets: [
                {
                    label: 'Income',
                    data: [],
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
                {
                    label: 'Expenses',
                    data: [],
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
            ],
        };
    }

    function getUpdatedChartData() {
        
        const dateAmountMap = {};
    
        // Aggregate income amounts by date
        incomes.forEach((income) => {
            const dateKey = moment(income.date.seconds * 1000).format('DD MMM');
            if (!dateAmountMap[dateKey]) {
                dateAmountMap[dateKey] = { income: 0, expense: 0 };
            }
            dateAmountMap[dateKey].income += Number(income.transactionAmount);
        });
    
        // Aggregate expense amounts by date
        expenses.forEach((expense) => {
            const dateKey = moment(expense.date.seconds * 1000).format('DD MMM');
            if (!dateAmountMap[dateKey]) {
                dateAmountMap[dateKey] = { income: 0, expense: 0 };
            }
            dateAmountMap[dateKey].expense += Number(expense.transactionAmount);
        });
    
        const labels = Object.keys(dateAmountMap).sort((a, b) => moment(a, 'DD MMM').toDate() - moment(b, 'DD MMM').toDate());
        const incomeData = [];
        const expenseData = [];
    
        // Populate income and expense data arrays
        labels.forEach((label) => {
            incomeData.push(dateAmountMap[label].income);
            expenseData.push(dateAmountMap[label].expense);
        });
    
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 2,
                    tension: 0.2,
                },
            ],
        };
    }
    
    
    

    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Income vs. Expenses',
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    callback: (value) => `${currency} ${value.toFixed(2)}`, // Format y-axis ticks as currency
                },
            },
        },
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
        <ChartStyled>
            <Line data={chartData} options={chartOptions} />
        </ChartStyled>

        </div>
    );
}

const ChartStyled = styled.div`
    background: #FFFFFF;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 40vh;
    margin-top: 10px;
`;

export default IncomeExpenseLineGraph;
