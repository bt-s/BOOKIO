import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';
import DeleteAccount from '../../components/Account/DeleteAccount';

import Button from '../Button/Button';
import DefaultLoginToggle from './DefaultLoginToggle';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    method: 'E-mail login',
    provider: null
  },
  {
    id: 'facebook.com',
    method: 'Facebook login',
    provider: 'facebookProvider'
  }
];

const LoginManagementBase = props => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSignInMethods();
  }, []);

  const fetchSignInMethods = () => {
    props.firebase.auth
      .fetchSignInMethodsForEmail(props.authUser.email)
      .then(activeSignInMethods => setActiveSignInMethods(activeSignInMethods))
      .catch(error => setError(error));
  };

  const onSocialLoginLink = provider => {
    props.firebase.auth.currentUser
      .linkWithPopup(props.firebase[provider])
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  const onDefaultLoginLink = password => {
    const credential = props.firebase.emailAuthProvider.credential(
      props.authUser.email,
      password
    );

    props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  const onUnlink = providerId => {
    props.firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  return (
    <React.Fragment>
      <ul className="settings">
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(signInMethod.id);

          return (
            <li key={signInMethod.id}>
              {signInMethod.id === 'password' ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onDefaultLoginLink}
                  onUnlink={onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onSocialLoginLink}
                  onUnlink={onUnlink}
                />
              )}
            </li>
          );
        })}
        <li>
          <DeleteAccount />
        </li>
      </ul>
      {error && error.message}
    </React.Fragment>
  );
};

LoginManagementBase.propTypes = {
  firebase: PropTypes.object,
  authUser: PropTypes.object
};

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <Button
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
      text={`Deactivate ${signInMethod.method}`}
    />
  ) : (
    <Button
      onClick={() => onLink(signInMethod.provider)}
      text={`Link to ${signInMethod.method}`}
    />
  );

const LoginManagement = withFirebase(LoginManagementBase);

export default LoginManagement;
