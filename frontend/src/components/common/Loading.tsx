import React from 'react';

import '../../style/loading.css';

const Loading: React.FC = () => (
  <div className="loadingIndicator d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loading;
