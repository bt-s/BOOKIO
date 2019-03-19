import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {withFirebase} from '../components/Firebase';
import {withAuthorization} from '../components/Session/Session';
import Loader from '../components/Loader/Loader';

import * as ROLES from '../constants/roles';

const AdminPage = props => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = props.firebase.users().onSnapshot(snapshot => {
      let users = [];

      snapshot.forEach(doc => users.push({...doc.data(), uid: doc.id}));

      setUsers(users);
      setLoading(false);

      return [setLoading(false), unsubscribe()];
    });
  }, []);

  return (
    <div>
      <h1>Admin</h1>

      <p>The Admin Page is accessible by every signed in admin user.</p>

      {loading && <Loader />}

      <UserList users={users} />
    </div>
  );
};

AdminPage.propTypes = {
  firebase: PropTypes.object
};

const UserList = ({users}) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
};

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
