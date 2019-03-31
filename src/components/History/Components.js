import React from 'react';
import {Link} from 'react-router-dom';

import reactJPG from '../../images/fullstackreact.jpg';
import {UserLabel} from '../Books/Components';

const ItemInfo = props => {
  return (
    <div className="item-info">
      <img src={reactJPG} alt="item img" />
      <div className="part-b">
        <div className="title-and-status">
          <div className="title" />
          <div className="status" />
        </div>
        <div className="supplement" />
      </div>
    </div>
  );
};

const RequestMessage = props => {
  return (
    <div className="request-msg">
      <div className="msg-time">11 Mar. 2019, 14:22</div>
      <ItemInfo />
      <div className="people-and-peration">
        <div className="type-and-people">
          <div className="type" />
          <Link to="/account" className="user-container">
            <UserLabel />
          </Link>
        </div>
        <div className="operation" />
      </div>
      <div className="msg-cut-off-line">---------------</div>
    </div>
  );
};

export {RequestMessage};
