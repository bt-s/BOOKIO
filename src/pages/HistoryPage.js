import React, {useState} from 'react';
import {withFirebase} from '../components/Firebase';

import Radio from '../components/Button/Radio';
import {RequestMessage} from '../components/History/Components';

const _ = require('lodash/core');

const HistoryPage = props => {
  const [msgType, setMsgType] = useState('give');
  const [gotTransactions, setGotTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);

  if (!gotTransactions) {
    console.log('////', props);

    props.firebase.myUID &&
      props.firebase
        .user(props.firebase.getMyUID())
        .get()
        .then(user => {
          const transactions = user.data().transactions;
          console.log(!_.isEmpty(transactions));

          !_.isEmpty(transactions) &&
            Promise.all(
              transactions.map(id =>
                props.firebase
                  .transaction(id)
                  .get()
                  .then(transac => {
                    return {id: id, ...transac.data()};
                  })
              )
            ).then(transactions => {
              transactions.forEach(transac => {
                // calc transaction type
                transac.type =
                  transac.type === 'to borrow'
                    ? transac.providerID === props.firebase.getMyUID()
                      ? 'lend'
                      : 'borrow'
                    : transac.providerID === props.firebase.getMyUID()
                    ? 'give'
                    : 'get';

                props.firebase
                  .user(
                    transac.providerID === props.firebase.getMyUID()
                      ? transac.consumerID
                      : transac.providerID
                  )
                  .get()
                  .then(
                    user =>
                      (transac.involvedUser = user.exists ? user.data() : false)
                  );
                props.firebase
                  .book(transac.itemID)
                  .get()
                  .then(
                    book => (transac.book = book.exists ? book.data() : false)
                  );
              });

              setTransactions(transactions);
              setGotTransactions(true);
            });
        });

    // previous one, working, but data not filtered
    // props.firebase
    //   .transactions()
    //   .get()
    //   .then(querySnapshot => {
    //     const transacs = querySnapshot.docs.map(doc => {
    //       return {id: doc.id, ...doc.data()};
    //     });
    //     transacs.forEach(transac => {
    //       props.firebase
    //         .user(
    //           transac.providerID === props.firebase.getMyUID()
    //             ? transac.consumerID
    //             : transac.providerID
    //         )
    //         .get()
    //         .then(
    //           user => (transac.involvedUser = user.exists ? user.data() : false)
    //         );
    //       props.firebase
    //         .book(transac.itemID)
    //         .get()
    //         .then(book => (transac.book = book.exists ? book.data() : false));
    //     });
    //     setTransactions(transacs);
    //     setGotTransactions(true);
    //   });
  }

  function getMsgOfType(type) {
    return transactions
      .filter(msg => {
        return msg.type === msgType;
      })
      .map((msg, index) => (
        <RequestMessage
          message={msg}
          key={'req_msg' + index}
          declineCallback={() => {
            props.firebase.transaction(msg.id).update({status: 'declined'});
          }}
          acceptCallback={() => {
            props.firebase.transaction(msg.id).update({status: 'accpeted'});
          }}
        />
      ));
  }

  return (
    <div className="history-page">
      <div className="filters">
        <Radio
          key="lend"
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
          key="give"
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
          key="borrow"
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
          key="get"
          name="history-type"
          value="get"
          label="Getting"
          checked={msgType === 'get'}
          onChange={() => {
            setMsgType('get');
          }}
        />
      </div>
      {gotTransactions && (
        <div className="msg-container">{getMsgOfType(msgType)}</div>
      )}
    </div>
  );
};

export default withFirebase(HistoryPage);
