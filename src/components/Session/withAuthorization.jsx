import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {useFirebase} from '../../firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => props => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const authUser = useSelector(state => state.sessionState.authUser);

  useEffect(() => {
    const unsubscribe = firebase.onAuthUserListener(
      authUser => {
        if (!condition(authUser)) {
          navigate(ROUTES.LOG_IN);
        }
      },
      () => navigate(ROUTES.LOG_IN)
    );

    return unsubscribe;
  }, [firebase, navigate]);

  return condition(authUser) ? <Component {...props} authUser={authUser} /> : null;
};

export default withAuthorization;
