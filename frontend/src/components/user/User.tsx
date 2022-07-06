import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../common/Title';
import UserTable from './table/UserTable';
import { User } from '../../entities/User.entity';
import UserCards from './cards/UserCards';
import UserApi from '../../api/userApi';

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const userApi = new UserApi();

  useEffect(() => {
    userApi.get().then((res) => {
      setUsers(res);
    });
  }, []);

  const handleDelete = (user: User) => {
    // TODO: Confirm dialog & add to UserCards
    try {
      console.log(`DELETE: ${user.id}`);
      // await userApi.delete(user.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Title title="Users" />
      <Link to="/user/newUser">
        <i className="fa fa-plus-square fa-2x ps-4 pb-3" />
      </Link>
      {window.screen.availWidth < 512 ? (
        <UserCards users={users} />
      ) : (
        <UserTable users={users} deleteUser={handleDelete} />
      )}
    </div>
  );
}

export default Users;
