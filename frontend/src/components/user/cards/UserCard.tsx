import React from 'react';
import { User } from '../../../entities/User.entity';

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <div className="card m-3">
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Username: {user.username}</li>
      <li className="list-group-item">User: {user.email}</li>
      <li className="list-group-item">
        Actions:
        <button type="button" className="btn btn-primary btn-sm">
          <i className="fa fa-edit" />
        </button>
        <button type="button" className="btn btn-danger btn-sm">
          <i className="fa fa-trash" />
        </button>
      </li>
    </ul>
  </div>
);

export default UserCard;
