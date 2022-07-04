import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import Title from '../../common/Title';

const TransactionEdit: React.FC = () => {
  const { id } = useParams();
  let title;
  if (id === 'new') {
    title = 'New Transaction';
  } else {
    title = `Edit Transaction ${id}`;
  }

  return (
    <div>
      <Title title={title} />
      <div className="mx-3">
        <TransactionForm id={id} />
      </div>
    </div>
  );
};

export default TransactionEdit;
