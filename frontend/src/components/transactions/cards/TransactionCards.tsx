import React from 'react';
import { Transaction } from '../../../entities/Transaction.entity';
import TransactionCard from './TransactionCard';

const TransactionCards: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <>
    {transactions.map((transaction) => (
      <TransactionCard transaction={transaction} />
    ))}
  </>
);

export default TransactionCards;
