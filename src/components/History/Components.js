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
  status: 'Requesting'
  // supplement: 'Duration: 1-23 Mar. 2019'
};

const RequestMessage = props => {
  const [id, setId] = useState(props.message.id);
  const [showOperation, setShowOperation] = useState(
    props.message.status === 'ongoing'
  );
  const [status, setStatus] = useState(props.message.status);
  const {createdAt} = props.message.stuff
    ? props.message.stuff
    : {createdAt: '1970-01-01'};

  return (
    <div className="request-msg">
      <div className="msg-time">
        {createdAt
          ? [new Date(createdAt)].map(
              date =>
                date.toDateString().substr(4) +
                ', ' +
                date.getHours() +
                ':' +
                date.getMinutes()
            )[0]
          : null}
      </div>
      <div className="msg-body">
        <ItemInfo
          imgURL={
            props.message.stuff
              ? props.message.stuff.imageUrls.length > 0
                ? props.message.stuff.imageUrls[0]
                : null
              : null
          }
          title={props.message.stuff.title}
          status={status}
          supplement={props.message.supplement}
        />
        <div className="people-and-operation">
          <div className="type-and-people">
            {/* <div className="type">{props.message.stuff.type}</div> */}
            <Link to="/account" className="user-container">
              <UserLabel
                userName={props.message.involvedUser.username}
                avatarURL={props.message.involvedUser.photoURL}
                // bio={props.message.involvedUser.userName}
              />
            </Link>
          </div>
          {showOperation && (
            <div className="operation">
              <button
                className="btn decline"
                onClick={() => {
                  if (props.declineCallback) {
                    props.declineCallback();
                    setStatus('Declined');
                    setShowOperation(false);
                  }
                }}>
                Decline
              </button>
              <button
                className="btn accept"
                onClick={() => {
                  if (props.acceptCallback) {
                    props.acceptCallback();
                    setStatus('Accepted');
                    setShowOperation(false);
                  }
                }}>
                Accept
              </button>
            </div>
          )}
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
