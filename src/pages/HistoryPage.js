import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../components/Button/Button';
import Radio from '../components/Button/Radio';
import {RequestMessage} from '../components/History/Components';

const HistoryPage = props => {
  return (
    <div className="history-page">
      <div className="filters">
        <Radio id="lend" name="history-type" value="lend" label="Lending" />
        <Radio id="give" name="history-type" value="give" label="Giving" />
        <Radio
          id="borrow"
          name="history-type"
          value="borrow"
          label="Borrowing"
        />
        <Radio id="get" name="history-type" value="get" label="Getting" />
      </div>
      <div className="msg-container">
        <RequestMessage />
      </div>
    </div>
  );
};

export default HistoryPage;
