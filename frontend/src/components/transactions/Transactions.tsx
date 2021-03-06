import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TransactionCards from './TransactionCards';
import TransactionsTable from './TransactionsTable';
import Title from '../common/Title';
import { Transaction } from '../../entities/Transaction.entity';
import TransactionApi from '../../api/transactionApi';
import Loading from '../common/Loading';
import TransactionsFilter from './TransactionsFilter';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const transactionApi = new TransactionApi();

  const fetchTransactions = () => {
    try {
      setLoading(true);
      transactionApi.getByMonthYear(month, year).then((res) => setTransactions(res));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      transactionApi.getYears().then((res) => {
        setYears(res);
        setYear(res[res.length - 1]);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  const handleDelete = async (transaction: Transaction) => {
    if (!window.confirm(`Are you sure you want do delete transaction ${transaction.id}?`)) {
      return;
    }

    try {
      setLoading(true);
      await transactionApi.delete(transaction.id);
      const changedTransactions = transactions.filter((i) => i.id !== transaction.id);
      setTransactions(changedTransactions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/transaction/${id}`);
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };

  return (
    <div>
      <Title title="Transactions" />
      <div className="d-flex">
        <Link to="/transaction/new">
          <i className="fa fa-plus-square fa-2x ps-4 pb-3" />
        </Link>
        <TransactionsFilter
          month={month}
          year={year}
          years={years}
          changeMonth={handleMonthChange}
          changeYear={handleYearChange}
        />
      </div>
      {window.screen.availWidth < 512 ? (
        <TransactionCards transactions={transactions} editTransaction={handleEdit} deleteTransaction={handleDelete} />
      ) : (
        <TransactionsTable transactions={transactions} editTransaction={handleEdit} deleteTransaction={handleDelete} />
      )}
      {loading && <Loading />}
    </div>
  );
};

export default Transactions;
