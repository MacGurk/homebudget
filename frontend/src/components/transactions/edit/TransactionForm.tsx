import React, { ReactElement, useState } from 'react';
import { User } from '../../../entities/User.entity';
import { ApiResponse, useApiGet } from '../../../hooks/useAPI';
import { Transaction } from '../../../entities/Transaction.entity';

const TransactionForm: React.FC<{ id: string | undefined }> = ({ id }): ReactElement => {
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [user, setUser] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  const getUsers: ApiResponse<User[]> = useApiGet('/user');
  if (!getUsers.loading) {
    if (getUsers.data) setUsers(getUsers.data);
  }
  if (id !== 'new') {
    const getTransaction: ApiResponse<Transaction> = useApiGet(`/transaction/${id}`);
    if (getTransaction.error) {
      setError(getTransaction.error);
    }
    const transaction: Transaction = getTransaction.data;
    if (transaction) {
      setDate(transaction.date.toISOString());
      setUser(transaction.user.username);
      setDescription(transaction.description);
      setPrice(transaction.price);
    }
  }

  // create API custom Hook
  const handleSubmit = async () => {};

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value).toISOString());
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value, 10));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="transactiondate">
          Transaction date
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
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="transactionuser">
          User
          <select
            name="user"
            className="form-control"
            id="transactionuser"
            value={user}
            onChange={handleUserChange}
          >
            {users.map((userSelect: User) => (
              <option value={userSelect.id}>{userSelect.username}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="transactiondescription">
          Description
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
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="transactionprice">
          Price
          <input
            name="price"
            type="number"
            className="form-control"
            id="transactionprice"
            min="0.00"
            step="0.01"
            placeholder="Enter price of transaction"
            onChange={handlePriceChange}
            value={price}
            required
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
