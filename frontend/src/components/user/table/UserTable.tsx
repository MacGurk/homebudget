import React from 'react';
import { User } from '../../../entities/User.entity';
import UserRow from './UserRow';

const UserTable: React.FC<{ users: User[] }> = ({ users }) => (
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
          <UserRow user={user} />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
