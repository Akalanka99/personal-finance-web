import React from 'react';
import Transaction from './Transaction';

const TransactionList = ({ transactions }) => (
  <div className="overflow-x-auto">
    <table className='min-w-full border border-collapse text-black'>
      <thead>
        <tr>
          <th className="py-2 px-4 border">Date</th>
          <th className="py-2 px-4 border">Category</th>
          <th className="py-2 px-4 border">Amount</th>
          <th className="py-2 px-4 border">Type</th>
          <th className="py-2 px-4 border">Note</th>
        </tr>
      </thead>
      <tbody className='text-gray-700'>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionList;
