import React, { useEffect, useState } from 'react';
import Title from '../common/Title';
import DashboardUserCard from './DashboardUserCard';
import { User } from '../../entities/User.entity';
import UserApi from '../../api/userApi';
import Loading from '../common/Loading';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
      <Title title="Dashboard" />
      {loading && <Loading />}
      <div className="p-3">
        <div className="row">
          {users.map((user) => (
            <div className="col-xl-3 pb-3">
              <DashboardUserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
