import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../common/Title';
import UserTable from './table/UserTable';
import { User } from '../../entities/User.entity';
import UserCards from './cards/UserCards';
import UserApi from '../../api/userApi';
import Loading from '../common/Loading';

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const userApi = new UserApi();

  useEffect(() => {
    try {
      setLoading(true);
      userApi.get().then((res) => setUsers(res));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (user: User) => {
    if (!window.confirm(`Are you sure you want do delete user ${user.username}?`)) {
      return;
    }

    try {
      setLoading(true);
      await userApi.delete(user.id);
      const newUsers = users.filter((i) => i.id !== user.id);
      setUsers(newUsers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <Title title="Users" />
      <Link to="/user/newUser">
        <i className="fa fa-plus-square fa-2x ps-4 pb-3" />
      </Link>
      {window.screen.availWidth < 512 ? (
        <UserCards users={users} editUser={handleEdit} deleteUser={handleDelete} />
      ) : (
        <UserTable users={users} editUser={handleEdit} deleteUser={handleDelete} />
      )}
      {loading && <Loading />}
    </div>
  );
}

export default Users;
