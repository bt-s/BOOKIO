import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {compose} from 'recompose';

import {withFirebase} from '../components/Firebase';
import {RequestMessage} from '../components/History/RequestMessage';

import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import Loader from '../components/Loader/Loader';
import Radio from '../components/Button/Radio';

const HistoryPage = props => {
  const [msgType, setMsgType] = useState(
    localStorage.getItem('history_type') || 'lend'
  );
  const [gotTransactions, setGotTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [tictok, setTictok] = useState(0);
  const [typeAmount, setTypeAmount] = useState({
    lend: 0,
    give: 0,
    get: 0,
    borrow: 0
  });

  const manageTransactions = user => {
    Promise.all(
      user.data().transactions.map(id =>
        props.firebase
          .transaction(id)
          .get()
          .then(transac => {
            transac = transac.data();
            transac.id = id;
            // calc transaction type
            if (transac.type === 'lend') {
              transac.type =
                transac.providerID === props.firebase.getMyUID()
                  ? 'lend'
                  : 'borrow';
            } else {
              transac.type =
                transac.providerID === props.firebase.getMyUID()
                  ? 'give'
                  : 'get';
            }

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
                  user => (transac.involvedUser = user.data())
                ),
              props.firebase
                .book(transac.itemID)
                .get()
                .then(
                  // inject book data
                  book => (transac.book = book.data())
                )
            ]).then(bookAndUser => {
              return transac;
            });
          })
      )
    ).then(transacsWithData => {
      // calc amount of different types
      const tmpTypeCount = ['lend', 'give', 'borrow', 'get']
        .map(type => {
          return {
            [type]: transacsWithData.filter(transac => type === transac.type)
              .length
          };
        })
        .reduce((pre, cur) => Object.assign(pre, cur));

      setTypeAmount(tmpTypeCount);
      setTransactions(transacsWithData);
      setGotTransactions(true);
    });
  };

  const noTransactionsToShow = () => (
    <div className="no-transactions">
      <p>
        It seems like you have not requested any books and that no one has
        requested books from you. As soon as you have made a request, or a
        request has been made to you, information about such requests will be
        available on this page.
      </p>
      <div className="no-transaction-buttons">
        <Link to={ROUTES.BOOKS} className="btn btn-orange btn-no-transac">
          <span>Find Books</span>
        </Link>
        <Link className="btn btn-black btn-no-transac" to={ROUTES.ADD_BOOK}>
          <span>Add Book</span>
        </Link>
      </div>
    </div>
  );

  if (!gotTransactions) {
    if (!props.firebase.getMyUID()) {
      // use this to keep re-rendering until firebase mounted
      setTimeout(() => {
        setTictok(tictok + 1);
      }, tictok * 200);
    } else {
      props.firebase
        .user(props.firebase.getMyUID())
        .get()
        .then(user => manageTransactions(user));
      // });
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
            props.firebase.transaction(msg.id).update({status: 'accepted'});
          }}
        />
      ));
  };

  return gotTransactions ? (
    transactions && transactions.length > 0 ? (
      <div className="history-page">
        <div className="filters">
          <Radio
            key="lend"
            id="lend"
            name="history-type"
            value="lend"
            label={
              'Lending' + (typeAmount.lend > 0 ? `(${typeAmount.lend})` : '')
            }
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
            label={
              'Giving' + (typeAmount.give > 0 ? `(${typeAmount.give})` : '')
            }
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
            label={
              'Borrowing' +
              (typeAmount.borrow > 0 ? `(${typeAmount.borrow})` : '')
            }
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
            label={
              'Getting' + (typeAmount.get > 0 ? `(${typeAmount.get})` : '')
            }
            checked={msgType === 'get'}
            onChange={() => {
              setMsgType('get');
              localStorage.setItem('history_type', 'get');
            }}
          />
        </div>
        <div className="msg-container">{getMsgOfType(msgType)}</div>
      </div>
    ) : (
      noTransactionsToShow()
    )
  ) : (
    <Loader />
  );
};

HistoryPage.propTypes = {
  authUser: PropTypes.object,
  books: PropTypes.array,
  dispatch: PropTypes.func,
  firebase: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default compose(
  withAuthorization(authUser => !!authUser),
  withEmailVerification,
  withFirebase
)(HistoryPage);
