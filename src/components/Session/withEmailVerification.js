import React, {useState} from 'react';

import AuthUserContext from './context';
import {withFirebase} from '../Firebase';

import Button from '../Button/Button';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  const WithEmailVerification = props => {
    const [isSent, setIsSent] = useState(false);

    const onSendEmailVerification = () => {
      props.firebase.doSendEmailVerification().then(() => setIsSent(true));
    };

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          needsEmailVerification(authUser) ? (
            <div>
              {isSent ? (
                <p>
                  An e-mail verfication has been sent: Check your inbox (or spam
                  folder) for a confirmation e-mail. Refresh this page once you
                  confirmed our e-mail.
                </p>
              ) : (
                <p>
                  Verify your E-mail: Check your inbox (or spam folder) for a
                  confirmation e-mail or send another confirmation e-mail.
                </p>
              )}
              <Button
                onClick={onSendEmailVerification}
                disabled={isSent}
                text="Send confirmation e-mail"
              />
            </div>
          ) : (
            <Component {...props} />
          )
        }
      </AuthUserContext.Consumer>
    );
  };

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
