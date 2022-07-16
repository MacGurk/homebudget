import React from 'react';
import { User } from '../../../entities/User.entity';

interface UserTableProps {
  users: User[];
  editUser: (id: string) => void;
  deleteUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, editUser, deleteUser }) => (
  <div className="mx-3 border rounded">
    <table className="table table-striped" id="transactionTable">
      <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">E-Mail</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td data-label="Data">{user.username}</td>
            <td data-label="User">{user.email}</td>
            <td data-label="Actions">
              <button type="button" className="btn btn-primary btn-sm m-0" onClick={() => editUser(user.id)}>
                <i className="fa fa-edit" />
              </button>

              <button type="button" className="btn btn-danger btn-sm m-0" onClick={() => deleteUser(user)}>
                <i className="fa fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
