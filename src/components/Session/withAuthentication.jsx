import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useFirebase} from '../../firebase';

// Listens to Firebase auth state and mirrors it into Redux + localStorage,
// exactly like the 2019 class HOC - as a hook-based wrapper component.
const withAuthentication = Component => props => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  useEffect(() => {
    const authLocalStore = JSON.parse(localStorage.getItem('authUser'));
    if (authLocalStore) {
      dispatch({type: 'AUTH_USER_SET', authUser: authLocalStore});
    }

    const unsubscribe = firebase.onAuthUserListener(
      authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        dispatch({type: 'AUTH_USER_SET', authUser});
      },
      () => {
        localStorage.removeItem('authUser');
        dispatch({type: 'AUTH_USER_SET', authUser: null});
      }
    );

    return unsubscribe;
  }, [firebase, dispatch]);

  return <Component {...props} />;
};

export default withAuthentication;
