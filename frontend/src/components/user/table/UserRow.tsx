import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../entities/User.entity';

interface TransactionProps {
  user: User;
  deleteUser: (user: User) => void;
}

const TransactionRow: React.FC<TransactionProps> = ({ user, deleteUser }) => (
  <tr>
    <td data-label="Data">{user.username}</td>
    <td data-label="User">{user.email}</td>
    <td data-label="Actions">
      <Link to={`/user/${user.id}`}>
        <button type="button" className="btn btn-primary btn-sm">
          <i className="fa fa-edit" />
        </button>
      </Link>

      <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteUser(user)}>
        <i className="fa fa-trash" />
      </button>
    </td>
  </tr>
);

export default TransactionRow;
