import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import UserLabel from '../Books/UserLabel';
import ItemInfo from './ItemInfo';

const RequestMessage = props => {
  const [showOperation, setShowOperation] = useState(
    props.message.status.toLowerCase() === 'ongoing'
  );
  const [status, setStatus] = useState(props.message.status);
  const {createdAt} = props.message.book
    ? props.message.book
    : {createdAt: '1970-01-01'};

  const statusMap = status => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return ['get', 'borrow'].includes(props.message.type.toLowerCase())
          ? 'Requesting'
          : 'Waiting For Response';
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      default:
        return '';
    }

    // This code can never be reached
    return {ongoing: 'Waiting For Response'}[status.toLowerCase()];
  };
  const OperationButtons = (
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
  );

  const formatDate = createdAt =>
    [new Date(createdAt)].map(
      date =>
        date.toDateString().substr(4) +
        ', ' +
        date.getHours() +
        ':' +
        date.getMinutes()
    )[0];

  return (
    <div className="request-msg">
      <div className="msg-time">{createdAt ? formatDate(createdAt) : null}</div>
      <div className="msg-body">
        <ItemInfo
          imgURL={
            (props.message.book &&
              props.message.book.imageUrls.length > 0 &&
              props.message.book.imageUrls[0]) ||
            'No Picture Provided'
          }
          title={props.message.book && props.message.book.title}
          status={statusMap(status)}
          supplement={props.message.supplement}
          bookId={props.message.itemID}
        />

        <div className="people-and-operation">
          <div className="type-and-people">
            {/*  */}
            {/*  */}
            {/* Here should link to that user's profile page */}
            {/*  */}
            {/*  */}
            <Link to="/account" className="user-container">
              <UserLabel
                userName={props.message.involvedUser.username}
                avatarUrl={props.message.involvedUser.photoUrl}
              />
            </Link>
            {props.message.status.toLowerCase() === 'accepted' &&
              (props.message.involvedUser.email ||
                props.message.involvedUser.phoneNumber)}
          </div>
          {showOperation &&
            ['give', 'lend'].includes(props.message.type.toLowerCase()) &&
            props.message.status.toLowerCase() === 'ongoing' &&
            OperationButtons}
        </div>
      </div>
      <div className="msg-cut-off-line" />
    </div>
  );
};
RequestMessage.propTypes = {
  message: PropTypes.object,
  declineCallback: PropTypes.func,
  acceptCallback: PropTypes.func
};

export {RequestMessage};
