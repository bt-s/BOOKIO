import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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

  const involvedUser = props.message.involvedUser;

  const statusMap = status => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return ['get', 'borrow'].includes(props.message.type.toLowerCase())
          ? 'Requested'
          : 'Waiting For Response';
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      default:
        return '';
    }
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
        <span>Decline</span>
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
        <span>Accept</span>
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

  const providerContactDetails = (
    <React.Fragment>
      {involvedUser.email && (
        <div className="contact-option">
          <FontAwesomeIcon icon="envelope" />
          <span>{involvedUser.email}</span>
        </div>
      )}
      {involvedUser.photoNumer && (
        <div className="contact-option">
          <FontAwesomeIcon icon="phone" />
          <span>{involvedUser.phoneNumber}</span>
        </div>
      )}
    </React.Fragment>
  );

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
            <div className="user">
              {props.message.type === ('give' || 'lend') ? (
                <span>Book requested by: </span>
              ) : (
                <span>Book provided by: </span>
              )}

              <UserLabel
                userName={involvedUser.username}
                avatarUrl={involvedUser.photoUrl}
              />
              {props.message.status.toLowerCase() === 'accepted' &&
                providerContactDetails}
            </div>
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
