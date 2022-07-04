import React from 'react';
import { User } from '../../../entities/User.entity';
import UserCard from './UserCard';

const UserCards: React.FC<{ users: User[] }> = ({ users }) => (
  <>
    {users.map((user) => (
      <UserCard user={user} />
    ))}
  </>
);

export default UserCards;
