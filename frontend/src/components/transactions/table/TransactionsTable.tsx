import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';

const TransactionsTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div className="mx-3 border rounded">
    <table className="table table-striped" id="transactionTable">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">User</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td data-label="Data">{new Date(transaction.date).toLocaleDateString()}</td>
            <td data-label="User">{transaction.user.username}</td>
            <td data-label="Description">{transaction.description}</td>
            <td data-label="Price">{transaction.price}</td>
            <td data-label="Actions">
              <button type="button" className="btn btn-primary btn-sm">
                <i className="fa fa-edit" />
              </button>
              <button type="button" className="btn btn-danger btn-sm">
                <i className="fa fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionsTable;
