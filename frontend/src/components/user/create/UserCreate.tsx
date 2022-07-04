import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../common/Title';
import UserApi from '../../../api/userApi';
import { CreateUser } from '../../../entities/User.entity';
import Alert from '../../common/Alert';
import AlertLevel from '../../../enums/AlertLevel';

const UserCreate: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const userApi = new UserApi();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newUser: CreateUser = {
      username,
      email,
      password,
    };

    try {
      setLoading(true);
      await userApi.add(newUser);
      navigate(-1);
    } catch (e: any) {
      setError(true);
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Title title="Create new user" />
      <div className="mx-3">
        {error && <Alert message={errorMessage} level={AlertLevel.Error} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username of user"
              onChange={handleUsernameChange}
              value={username}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input
              name="email"
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter E-Mail of user"
              onChange={handleEmailChange}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              className="form-control"
              id="password"
              placeholder="Enter password of user"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {loading
              ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )
              : 'Submit'}

          </button>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
