import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import reactJPG from '../../images/fullstackreact.jpg';

import {UserLabel} from '../Books/Components';

const ItemInfo = props => {
  return (
    <div className="item-info">
      <img src={props.imgURL} alt="item img" />
      <div className="part-b">
        <div className="title-and-status">
          <div className="title">{props.title}</div>
          <div className="status">{props.status}</div>
        </div>
        <div className="supplement">{props.supplement}</div>
      </div>
    </div>
  );
};
ItemInfo.propTypes = {
  imgURL: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
  supplement: PropTypes.object //
};
ItemInfo.defaultProps = {
  imgURL: reactJPG,
  title: 'The Great Gatsby',
  status: 'Requesting',
  supplement: 'Duration: 1-23 Mar. 2019'
};

const RequestMessage = props => {
  const [id, setId] = useState(props.message.id);
  return (
    <div className="request-msg">
      <div className="msg-time">{props.message.time}</div>
      <div className="msg-body">
        <ItemInfo
          imgURL={props.message.imgURL}
          title={props.message.title}
          status={props.message.status}
          supplement={props.message.supplement}
        />
        <div className="people-and-operation">
          <div className="type-and-people">
            <div className="type">Request to borrow</div>
            <Link to="/account" className="user-container">
              <UserLabel
                userName={props.message.involvedUser.userName}
                // avatarURL={props.message.involvedUser.userName}
                // bio={props.message.involvedUser.userName}
              />
            </Link>
          </div>
          <div className="operation">
            <button
              className="btn decline"
              onClick={() =>
                props.declineCallback ? props.declineFunction(id) : null
              }>
              Decline
            </button>
            <button
              className="btn accept"
              onClick={() =>
                props.acceptCallback ? props.acceptCallback(id) : null
              }>
              Accept
            </button>
          </div>
        </div>
      </div>
      <div className="msg-cut-off-line" />
    </div>
  );
};
RequestMessage.propTypes = {
  message: PropTypes.object,
  // messageTime: PropTypes.string,
  // requestType: PropTypes.string,
  // /// Item Info
  // imgURL: PropTypes.string,
  // title: PropTypes.string,
  // status: PropTypes.string,
  // supplement: PropTypes.object,
  /// callback
  declineCallback: PropTypes.func,
  acceptCallback: PropTypes.func
};

export {RequestMessage};
