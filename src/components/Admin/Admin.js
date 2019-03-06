import React, {useState, useEffect} from 'react';

import {withFirebase} from '../Firebase';

import Loader from '../Loader/Loader';

const AdminPage = props => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      setUsers(usersList);
      setLoading(false);

      return [setLoading(false), props.firebase.users().off()];
    });
  }, [users]);

  return (
    <div>
      <h1>Admin</h1>

      {loading && <Loader />}

      <UserList users={users} />
    </div>
  );
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

export default withFirebase(AdminPage);
