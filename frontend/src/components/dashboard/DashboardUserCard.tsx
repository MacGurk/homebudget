import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../../entities/User.entity';
import Loading from '../common/Loading';
import TransactionApi from '../../api/transactionApi';

interface DashboardUserCardProps {
  user: User;
}

const DashboardUserCard: React.FC<DashboardUserCardProps> = ({ user }) => {
  const [transactions, setTransactions] = useState([
    { settled: true },
    { settled: false },
    { settled: true },
    { settled: true },
  ]);
  const [settleAmount, setSettleAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const transactionApi = new TransactionApi();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setTransactions(await transactionApi.getByUserId(user.id));
      const amount = await transactionApi.getUnsettledAmount(user.id);
      setSettleAmount(amount);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {}, [transactions]);

  return (
    <div className="card ">
      {loading && <Loading />}
      <h5 className="card-header">{user.username}</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Total transactions: {transactions.length}</li>
        <li className="list-group-item">Unsettled transactions: {transactions.filter((t) => !t.settled).length}</li>
        <li className="list-group-item">Unsettled amount: {settleAmount}.00 CHF</li>
      </ul>
    </div>
  );
};

export default DashboardUserCard;
