import React, { useEffect, useState } from 'react';
import Title from '../common/Title';
import Loading from '../common/Loading';
import SettlementApi from '../../api/settlementApi';
import { Settlement } from '../../entities/Settlement.entity';
import SettleCards from './SettleCards';

const Transactions: React.FC = () => {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const settlementApi = new SettlementApi();

  const fetchTransactions = () => {
    try {
      setLoading(true);
      settlementApi.get().then((res) => setSettlements(res));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <Title title="Settle" />
      <div className="d-flex" />
      <SettleCards settlements={settlements} />
      {loading && <Loading />}
    </div>
  );
};

export default Transactions;
