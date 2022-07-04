import React, { ReactElement, useState } from 'react';
import { CreateUser, User } from '../../../entities/User.entity';
import UserApi from '../../../api/userApi';

const UserEditForm: React.FC<{ user: User }> = ({ user }): ReactElement => {
  const [id] = useState(user.id);
  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('');

  const userApi = new UserApi();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (user.id === 'new') {
      const newUser: CreateUser = {
        username,
        email,
        password,
      };
      await userApi.add(newUser);
    } else {
      const updateUser: CreateUser = {
        username,
        email,
        password,
      };
      await userApi.update(user);
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
        Submit
      </button>
    </form>
  );
};

export default UserEditForm;
