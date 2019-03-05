import React, {useState, useEffect} from 'react';

import {AuthUserContext, withAuthorization} from '../Session/Session';
import {useFormInput} from '../../hooks/hooks';
import {withFirebase} from '../Firebase';
import PasswordChangeForm from '../PasswordChange/PasswordChange';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider'
  }
];

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email} </h1>
        <PasswordChangeForm />
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const LoginManagementBase = props => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSignInMethods();
  });

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
    <div>
      Sign In Methods:
      <ul>
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
      </ul>
      {error && error.message}
    </div>
  );
};

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}>
      Deactivate A {signInMethod.id}
    </button>
  ) : (
    <button type="button" onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </button>
  );

const DefaultLoginToggle = props => {
  const passwordOne = useFormInput('');
  const passwordTwo = useFormInput('');

  const onSubmit = e => {
    e.preventDefault();

    props.onLink(passwordOne);
  };

  const {onlyOneLeft, isEnabled, signInMethod, onUnlink} = props;

  const isInvalid =
    passwordOne.value !== passwordTwo.value || passwordOne === '';

  return isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}>
      Deactivate B {signInMethod.id}
    </button>
  ) : (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        type="password"
        placeholder="New password"
        {...passwordOne}
      />
      <input
        name="passwordTwo"
        type="password"
        placeholder="Confirm new password"
        {...passwordTwo}
      />
      <button disabled={isInvalid} type="submit">
        Link {signInMethod.id}
      </button>
    </form>
  );
};

const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
