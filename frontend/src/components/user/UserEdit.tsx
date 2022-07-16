import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from '../common/Title';
import UserApi from '../../api/userApi';
import { UpdatePassword, User } from '../../entities/User.entity';
import Alert from '../common/Alert';
import AlertLevel from '../../enums/AlertLevel';

const UserEdit: React.FC = () => {
  const { id } = useParams<string>();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userApi = new UserApi();

  useEffect(() => {
    if (id) {
      userApi.getById(id).then((res) => {
        setUsername(res.username);
        setEmail(res.email);
      });
    }
  }, []);

  const handleUserUpdateSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    const updatedUser: User = {
      id,
      username,
      email,
    };

    try {
      setLoading(true);
      await userApi.update(updatedUser);
    } catch (e) {
      setError(true);
      setErrorMessage('Error updating user');
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  const handlePasswordUpdateSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage('Passwords do not match');
      return;
    }

    const updatedPassword: UpdatePassword = {
      id,
      password,
    };

    try {
      setLoading(true);
      await userApi.updatePassword(updatedPassword);
    } catch (e) {
      setError(true);
      setErrorMessage('Error updating password');
    } finally {
      setLoading(false);
      setError(false);
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

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <Title title={`Edit User ${id}`} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-md-4 p-4 border rounded shadow">
            {error && <Alert message={errorMessage} level={AlertLevel.Error} />}
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
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    Loading...
                  </>
                ) : (
                  'Update User'
                )}
              </button>
            </form>
            <hr />
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordUpdateSubmit}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
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
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Confirm password"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    Loading...
                  </>
                ) : (
                  'Change Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
