import {useState} from 'react';
import {useSelector} from 'react-redux';

import {useFirebase} from '../../firebase';
import Button from '../Button/Button';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => props => {
  const firebase = useFirebase();
  const authUser = useSelector(state => state.sessionState.authUser);
  const [isSent, setIsSent] = useState(false);

  const onSendEmailVerification = () => {
    firebase.doSendEmailVerification().then(() => setIsSent(true));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return needsEmailVerification(authUser) ? (
    <div className="email-verification">
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
      <Button
        className={'btn btn-refresh'}
        onClick={refreshPage}
        disabled={isSent}
        text="I have confirmed my e-mail"
      />
    </div>
  ) : (
    <Component {...props} authUser={authUser} />
  );
};

export default withEmailVerification;
