import React, {useState, useEffect} from 'react';
import {withFirebase} from '../components/Firebase';

import Radio from '../components/Button/Radio';
import {RequestMessage} from '../components/History/Components';

const _ = require('lodash/core');

const HistoryPage = props => {
  const [msgType, setMsgType] = useState(
    localStorage.getItem('history_type') || 'lend'
  );
  const [gotTransactions, setGotTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [tictok, setTictok] = useState(0);

  if (!gotTransactions) {
    console.info(
      `wait another ${(0.2 * tictok).toFixed(
        2
      )}s for firebase be mounted to this page`
    );
    if (!props.firebase.myUID) {
      if (tictok > 50) {
      }
      setTimeout(() => {
        setTictok(tictok + 1);
      }, tictok * 200);
    } else {
      props.firebase
        .user(props.firebase.getMyUID())
        .get()
        .then(user => {
          const myTransacIds = user.data().transactions;
          !_.isEmpty(myTransacIds) &&
            Promise.all(
              myTransacIds.map(id =>
                props.firebase
                  .transaction(id)
                  .get()
                  .then(transac => {
                    return transac.data();
                  })
              )
            ).then(transactions => {
              Promise.all(
                transactions.map(transac => {
                  // calc transaction type
                  transac.type =
                    transac.type === 'to borrow'
                      ? transac.providerID === props.firebase.getMyUID()
                        ? 'lend'
                        : 'borrow'
                      : transac.providerID === props.firebase.getMyUID()
                      ? 'give'
                      : 'get';
                  return Promise.all([
                    props.firebase
                      // get the user other than me
                      .user(
                        transac.providerID === props.firebase.getMyUID()
                          ? transac.consumerID
                          : transac.providerID
                      )
                      .get()
                      .then(
                        // inject the other user's data
                        user => {
                          transac.involvedUser = user.data();
                        }
                      ),
                    props.firebase
                      .book(transac.itemID)
                      .get()
                      .then(
                        // inject book data
                        book => {
                          transac.book = book.data();
                        }
                      )
                  ]).then(bookAndUser => {
                    console.log('injected', bookAndUser, transac);
                    return transac;
                  });
                })
              ).then(transacsWithData => {
                console.log('the final full data', transacsWithData);
                setTransactions(transacsWithData);
                setGotTransactions(true);
              });
            });
        });
    }
  }

  const getMsgOfType = type => {
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
  };

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
            localStorage.setItem('history_type', 'lend');
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
            localStorage.setItem('history_type', 'give');
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
            localStorage.setItem('history_type', 'borrow');
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
            localStorage.setItem('history_type', 'get');
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
