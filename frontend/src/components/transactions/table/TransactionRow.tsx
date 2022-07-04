import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
  <tr>
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
);

export default TransactionRow;
