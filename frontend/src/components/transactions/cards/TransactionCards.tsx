import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';

interface TransactionsCardProps {
  transactions: Transaction[];
  editTransaction: (id: string) => void;
  deleteTransaction: (transaction: Transaction) => void;
}

const TransactionCards: React.FC<TransactionsCardProps> = ({ transactions, editTransaction, deleteTransaction }) => (
  <>
    {transactions.map((transaction) => (
      <div className="card m-3" key={transaction.id}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Date: {new Date(transaction.date).toLocaleDateString()}</li>
          <li className="list-group-item">User: {transaction.user.username}</li>
          <li className="list-group-item">Description: {transaction.description}</li>
          <li className="list-group-item">Price: {transaction.price}</li>
          <li className="list-group-item">
            {'Settled: '}
            {transaction.settled ? (
              <i className="fa fa-check text-success" />
            ) : (
              <i className="fa fa-times text-danger" />
            )}
          </li>
          <li className="list-group-item">
            Actions:
            <button type="button" className="btn btn-primary btn-sm" onClick={() => editTransaction(transaction.id)}>
              <i className="fa fa-edit" />
            </button>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteTransaction(transaction)}>
              <i className="fa fa-trash" />
            </button>
          </li>
        </ul>
      </div>
    ))}
  </>
);

export default TransactionCards;
