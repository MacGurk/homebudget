import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Content: React.FC = () => (
  <>
    <Nav />
    <div>
      <Outlet />
    </div>
  </>
);

export default Content;
