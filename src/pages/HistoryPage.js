import {Link} from 'react-router-dom';
import React, {useState} from 'react';

import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import Button from '../components/Button/Button';
import Radio from '../components/Button/Radio';
import {RequestMessage} from '../components/History/Components';

const fakeHistories = [
  {
    id: 'LDKGJ3OIEIODEWUIHD78^D876',
    type: 'lend',
    title: 'Little Prince',
    status: 'Waiting for response',
    time: '11 Mar. 2019, 14:22',
    involvedUser: {
      userName: 'King Kung'
    }
  },
  {
    id: '3o3OIEIODEWUIHD78^D876',
    type: 'lend',
    title: 'The Great Gatsby',
    status: 'Waiting for response',
    time: '11 Mar. 2019, 14:22',
    involvedUser: {
      userName: 'Steve'
    }
  }
];

const HistoryPage = props => {
  const [msgType, setMsgType] = useState('lend');
  const [showingMsg, setShowingMsg] = useState(fakeHistories);

  const updateShowingMsg = type => {
    setMsgType(type);
    // do the query and filter only specified msg
    setShowingMsg(
      props.history
        ? props.history.filter(msg => {
            return msg.type === type;
          })
        : []
    );
  };
  return (
    <div className="history-page">
      <div className="filters">
        <Radio
          id="lend"
          name="history-type"
          value="lend"
          label="Lending"
          checked={msgType === 'lend'}
          onChange={() => {
            updateShowingMsg('lend');
          }}
        />
        <Radio
          id="give"
          name="history-type"
          value="give"
          label="Giving"
          checked={msgType === 'give'}
          onChange={() => {
            updateShowingMsg('give');
          }}
        />
        <Radio
          id="borrow"
          name="history-type"
          value="borrow"
          label="Borrowing"
          checked={msgType === 'borrow'}
          onChange={() => {
            updateShowingMsg('borrow');
          }}
        />
        <Radio
          id="get"
          name="history-type"
          value="get"
          label="Getting"
          checked={msgType === 'get'}
          onChange={() => {
            updateShowingMsg('get');
          }}
        />
      </div>
      <div className="msg-container">
        {showingMsg ? (
          // The message structure has not been defined yet
          // thus, this part is yet to be developed
          showingMsg.map(msg => <RequestMessage message={msg} key={msg.id} />)
        ) : (
          <div>
            <br />
            <br />
            <br />
            <p> Nothing yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
