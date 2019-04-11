import React, {useState} from 'react';
import {withFirebase} from '../components/Firebase';

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
  const [msgType, setMsgType] = useState('give');
  const [gotTransactions, setGotTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // const histories = fakeHistories; // This should be retrieved on page load
  console.log('got?', gotTransactions);

  if (!gotTransactions) {
    console.log('hhhhhhhhh');

    props.firebase
      .transactions()
      .get()
      .then(querySnapshot => {
        const tmp = querySnapshot.docs.map(doc => doc.data());
        console.log(tmp);
        // 我得在这里 把missing 的info 加入到transactions中, 这些信息需要根据userid 去获取
        setTransactions(tmp);
        setGotTransactions(true);
      });
  }

  function getMsgOfType(type) {
    return transactions
      .filter(msg => {
        return msg.type === msgType;
      })
      .map(msg => <RequestMessage message={msg} key={msg.id} />);
  }
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
            setMsgType('lend');
          }}
        />
        <Radio
          id="give"
          name="history-type"
          value="give"
          label="Giving"
          checked={msgType === 'give'}
          onChange={() => {
            setMsgType('give');
          }}
        />
        <Radio
          id="borrow"
          name="history-type"
          value="borrow"
          label="Borrowing"
          checked={msgType === 'borrow'}
          onChange={() => {
            setMsgType('borrow');
          }}
        />
        <Radio
          id="get"
          name="history-type"
          value="get"
          label="Getting"
          checked={msgType === 'get'}
          onChange={() => {
            setMsgType('get');
          }}
        />
      </div>
      <div className="msg-container">{getMsgOfType(msgType)}</div>
    </div>
  );
};

export default withFirebase(HistoryPage);
