import React from 'react';
import { Link } from 'react-router-dom';
import TransactionCards from './cards/TransactionCards';
import TransactionsTable from './table/TransactionsTable';
import Title from '../common/Title';
import { Transaction } from '../../entities/Transaction.entity';

const Transactions: React.FC = () => {
  const dummyData: Transaction[] = [
    {
      id: '1',
      date: new Date(),
      description: 'description',
      price: 10,
      settled: false,
      user: {
        id: '1',
        username: 'username',
        email: 'asdfasdf',
      },
    },
    {
      id: '2',
      date: new Date(),
      description: 'description2',
      price: 20,
      settled: false,
      user: {
        id: '2',
        username: 'username2',
        email: 'asdfasdf2',
      },
    },
  ];

  return (
    <div>
      <Title title="Transactions" />
      <Link to="/transactions/new">
        <i className="fa fa-plus-square fa-2x ps-4 pb-3" />
      </Link>
      {window.screen.availWidth < 512 ? (
        <TransactionCards transactions={dummyData} />
      ) : (
        <TransactionsTable transactions={dummyData} />
      )}
    </div>
  );
};

export default Transactions;
