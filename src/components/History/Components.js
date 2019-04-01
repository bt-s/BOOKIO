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
          <div className="title">{props.title}</div>
          <div className="status">Requesting</div>
        </div>
        <div className="supplement">1-23 Mar. 2019</div>
      </div>
    </div>
  );
};
ItemInfo.defaultProps = {
  title: 'The Great Gatsby'
};

const RequestMessage = props => {
  return (
    <div className="request-msg">
      <div className="msg-time">11 Mar. 2019, 14:22</div>
      <div className="msg-body">
        <ItemInfo />
        <div className="people-and-operation">
          <div className="type-and-people">
            <div className="type">Request to borrow</div>
            <Link to="/account" className="user-container">
              <UserLabel />
            </Link>
          </div>
          <div className="operation">
            <button className="btn decline">Decline</button>
            <button className="btn accept">Accept</button>
          </div>
        </div>
      </div>
      <div className="msg-cut-off-line">---------------</div>
    </div>
  );
};

export {RequestMessage};
