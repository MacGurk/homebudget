import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <div className="card m-3">
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Date: {new Date(transaction.date).toLocaleDateString()}</li>
      <li className="list-group-item">User: {transaction.user.username}</li>
      <li className="list-group-item">Description: {transaction.description}</li>
      <li className="list-group-item">Price: {transaction.price}</li>
      <li className="list-group-item">
        Actions:
        <button type="button" className="btn btn-primary btn-sm">
          <i className="fa fa-edit" />
        </button>
        <button type="button" className="btn btn-danger btn-sm">
          <i className="fa fa-trash" />
        </button>
      </li>
    </ul>
  </div>
);

export default TransactionCard;
