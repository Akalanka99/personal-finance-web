import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../hooks/useAddTransaction"
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useNavigate, Navigate } from "react-router-dom";
import { User } from 'react-feather'

import { auth } from "../config/firebase-config";
import ExpenseChart from "../components/ExpenseChart";
import IncomeChart from "../components/IncomeChart";
import IncomeExpenseLineGraph from "../components/IncomeExpenseLineGraph";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





export default function Transactions(){
    const { addTransaction } = useAddTransaction();
    const { transactions,transactionTotals } = useGetTransactions();
    const {name,isAuth} = useGetUserInfo();
    const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [selectedDate, setSelectedDate] = useState(null);
  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
      createdAt: selectedDate || new Date(),
    });

    setDescription("");
    setTransactionAmount("");
    setSelectedDate(null);
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  if (!isAuth) {
    return <Navigate to="/" />;
  }
    return(
        <>
        <div className="dashboard-container max-h-screen overflow-auto">

          
        <h1>Hello, {name}</h1>

<div className="expense-tracker">
<div className="profile">
     {" "}
     <User size={80} color={"#494368"}/>
     <button className="bg-transparent hover:bg-purple-600 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded" onClick={signUserOut}>
       Sign Out
     </button>
   </div>
 <div className="container">
   <h1><b>Expense Tracker</b></h1>
   <div className="balance">
     <h3> Your Balance</h3>
     {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${Math.abs(balance)}</h2>}
   </div>
   <div className="summary">
     <div className="income">
       <h4> Income</h4>
       <p>${income}</p>
     </div>
     <div className="expenses">
       <h4> Expenses</h4>
       <p>${expenses}</p>
     </div>
   </div>
   <form className="add-transaction" onSubmit={onSubmit}>
     <input
       type="text"
       placeholder="Description"
       value={description}
       required
       onChange={(e) => setDescription(e.target.value)}
     />
     <input
       type="number"
       placeholder="Amount"
       value={transactionAmount}
       required
       onChange={(e) => setTransactionAmount(e.target.value)}
       
     />
       <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    placeholderText="Pickup Date"
  />
     <div>
     <input
       className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
       type="radio"
       id="expense"
       value="expense"
       checked={transactionType === "expense"}
       onChange={(e) => setTransactionType(e.target.value)}

       
     />
     <label htmlFor="expense"> Expense</label>
     <input
     className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
       type="radio"
       id="income"
       value="income"
       checked={transactionType === "income"}
       onChange={(e) => setTransactionType(e.target.value)}
     />
     <label htmlFor="income"> Income</label>
     </div>

     <button className="bg-transparent hover:bg-purple-600 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded" type="submit"> Add Transaction</button>
   </form>
 </div>
 </div>

 <div>

 <ExpenseChart/>
 </div>

 <div className="transactions">
     <h3>Transactions</h3>

     <ul>
   {transactions.map((transaction) => {
     const { description, transactionAmount, transactionType } =
       transaction;
     return (
       <li>
         <h4> {description} </h4>
         <p>
           ${transactionAmount} •{" "}
           <label
             style={{
               color: transactionType === "expense" ? "red" : "green",
             }}
           >
             {" "}
             {transactionType}{" "}
           </label>
         </p>
       </li>
     );
   })}
 </ul>    

 </div>

        </div>
    
            
        </>
    )
}