import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../components/Button/Button';
import {RequestMessage} from '../components/History/Components';

const HistoryPage = props => {
  return (
    <div className="history-page">
      <div className="filters">
        <Button type="toggle" className="filter-toggle" text="Give Away Only" />
        <Button type="toggle" className="filter-toggle" text="Near Me" />
        <Button type="toggle" className="filter-toggle" text="Books Only" />
      </div>
      <div className="msg-container">
        <RequestMessage />
      </div>
    </div>
  );
};

export default HistoryPage;
