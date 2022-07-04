import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';
import TransactionRow from './TransactionRow';

const TransactionsTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div className="mx-3 border rounded">
    <table className="table table-striped" id="transactionTable">
      <thead>
        <tr>
          <th scope="col" data-card-title>
            Date
          </th>
          <th scope="col">User</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionRow transaction={transaction} />
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionsTable;
