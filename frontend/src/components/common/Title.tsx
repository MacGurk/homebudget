import React from 'react';

const Title: React.FC<{ title: string }> = ({ title }) => (
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 pt-3 pb-2 px-3 border-bottom">
    <h2>{title}</h2>
  </div>
);

export default Title;
