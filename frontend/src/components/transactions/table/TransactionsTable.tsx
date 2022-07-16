import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';

interface TransactionsTableProps {
  transactions: Transaction[];
  editTransaction: (id: string) => void;
  deleteTransaction: (transaction: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, editTransaction, deleteTransaction }) => (
  <div className="mx-3 border rounded">
    <table className="table table-striped" id="transactionTable">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">User</th>
          <th scope="col">Description</th>
          <th scope="col">Price in CHF</th>
          <th scope="col">Settled</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td data-label="Data">{new Date(transaction.date).toLocaleDateString()}</td>
            <td data-label="User">{transaction.user.username}</td>
            <td data-label="Description">{transaction.description}</td>
            <td data-label="Price">{`${transaction.price}.00`}</td>
            <td data-label="Settled">
              {transaction.settled ? (
                <i className="fa fa-check text-success" />
              ) : (
                <i className="fa fa-times text-danger" />
              )}
            </td>
            <td data-label="Actions">
              <button
                type="button"
                className="btn btn-primary btn-sm m-0"
                onClick={() => editTransaction(transaction.id)}
              >
                <i className="fa fa-edit" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm m-0"
                onClick={() => deleteTransaction(transaction)}
              >
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
