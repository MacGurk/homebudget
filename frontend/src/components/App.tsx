import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Content from './common/Content';
import NoMatch from './misc/NoMatch';
import Dashboard from './dashboard/Dashboard';
import Transactions from './transactions/Transactions';
import Users from './user/User';
import TransactionEdit from './transactions/edit/TransactionEdit';
import UserEdit from './user/UserEdit';
import UserCreate from './user/UserCreate';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Content />}>
      <Route index element={<Dashboard />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="transactions/:id" element={<TransactionEdit />} />
      <Route path="user" element={<Users />} />
      <Route path="user/newUser" element={<UserCreate />} />
      <Route path="user/:id" element={<UserEdit />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
);

export default App;
