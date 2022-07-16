import React from 'react';
import { User } from '../../../entities/User.entity';

interface UserCardsProps {
  users: User[];
  editUser: (id: string) => void;
  deleteUser: (user: User) => void;
}

const UserCards: React.FC<UserCardsProps> = ({ users, editUser, deleteUser }) => (
  <>
    {users.map((user) => (
      <div className="card m-3" key={user.id}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Username: {user.username}</li>
          <li className="list-group-item">User: {user.email}</li>
          <li className="list-group-item">
            {'Actions: '}
            <button type="button" className="btn btn-primary btn-sm m-0" onClick={() => editUser(user.id)}>
              <i className="fa fa-edit" />
            </button>
            <button type="button" className="btn btn-danger btn-sm m-0" onClick={() => deleteUser(user)}>
              <i className="fa fa-trash" />
            </button>
          </li>
        </ul>
      </div>
    ))}
  </>
);

export default UserCards;
