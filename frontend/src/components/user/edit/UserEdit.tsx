import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../common/Title';
import UserApi from '../../../api/userApi';

const UserEdit: React.FC = () => {
  const { id } = useParams<string>();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const userApi = new UserApi();

  useEffect(() => {
    if (id) {
      userApi.getById(id).then((res) => {
        setUsername(res.username);
        setEmail(res.email);
      });
    }
  }, []);

  const handleUserUpdateSubmit = () => {

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

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <Title title={`Edit User ${id}`} />
      <div className="mx-3">
        <form onSubmit={handleUserUpdateSubmit}>
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
        <hr />
        <h3>Change Password</h3>
        <form>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              name="password"
              type="text"
              className="form-control"
              id="password"
              placeholder="Confirm password"
              onChange={handleConfirmPasswordChange}
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
