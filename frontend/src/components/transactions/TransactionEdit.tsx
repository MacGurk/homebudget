import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../common/Title';
import { User } from '../../entities/User.entity';
import TransactionApi from '../../api/transactionApi';
import { Transaction } from '../../entities/Transaction.entity';
import UserApi from '../../api/userApi';

const TransactionEdit: React.FC = () => {
  const { transactionId } = useParams();
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('New Transaction');
  const [date, setDate] = useState<Date>(new Date());
  const [user, setUser] = useState<User>({} as User);
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [settled, setSettled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const transactionApi = new TransactionApi();
  const userApi = new UserApi();

  useEffect(() => {
    try {
      userApi.get().then((res) => {
        setUsers(res);
        setUser(res[0]);
      });
      if (transactionId && transactionId !== 'new') {
        transactionApi.getById(transactionId).then((res) => {
          setDate(res.date);
          setUser(res.user);
          setDescription(res.description);
          setPrice(res.price);
          setSettled(res.settled);
        });
        setTitle(`Edit Transaction ${transactionId}`);
        setId(transactionId);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const transaction: Transaction = {
      id,
      date,
      user,
      description,
      price,
      settled,
    };
    if (id === 'new') {
      try {
        await transactionApi.add(transaction);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await transactionApi.update(transaction);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const changedUser = users.find((x) => x.id === event.target.value);
    if (changedUser) {
      setUser(changedUser);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value, 10));
  };

  const handleSettledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettled(event.target.checked);
  };

  return (
    <div>
      <Title title={title} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-md-4 p-4 border rounded shadow">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="transactiondate">Transaction date</label>
                <input
                  name="date"
                  type="date"
                  className="form-control"
                  id="transactiondate"
                  placeholder="select transaction date"
                  onChange={handleDateChange}
                  value={new Date(date).toISOString().substring(0, 10)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="transactionuser">User</label>
                <select
                  name="user"
                  className="form-select"
                  id="transactionuser"
                  value={user.id}
                  onChange={handleUserChange}
                >
                  {users.map((userSelect: User) => (
                    <option key={userSelect.id} value={userSelect.id}>
                      {userSelect.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="transactiondescription">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  id="transactiondescription"
                  placeholder="Enter description of transaction"
                  rows={2}
                  onChange={handleDescriptionChange}
                  value={description}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="transactionprice">Price</label>
                <div className="input-group">
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    id="transactionprice"
                    min="0"
                    step="1"
                    placeholder="Enter price of transaction"
                    onChange={handlePriceChange}
                    value={price}
                    required
                  />
                  <span className="input-group-text">.00 CHF</span>
                </div>
              </div>
              <div className="form-check mt-3">
                <input
                  name="settled"
                  type="checkbox"
                  className="form-check-input"
                  id="transactionSettled"
                  checked={settled}
                  onChange={handleSettledChange}
                />
                <label className="form-check-label" htmlFor="transactionSettled">
                  Settled
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionEdit;
