import React from 'react';
import { User } from '../../../entities/User.entity';
import UserRow from './UserRow';
import UserApi from '../../../api/userApi';

interface UserTableProps {
  users: User[];
  deleteUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, deleteUser }) => (
  <div className="mx-3 border rounded">
    <table className="table table-striped" id="transactionTable">
      <thead>
        <tr>
          <th scope="col" data-card-title>
            Username
          </th>
          <th scope="col">E-Mail</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow user={user} deleteUser={deleteUser} />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
