import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {withFirebase} from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const authLocalStore = JSON.parse(localStorage.getItem('authUser'));
      if (authLocalStore) this.props.onSetAuthUser(authLocalStore);

      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.onSetAuthUser(authUser);
        },
        () => {
          this.props.onSetAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({type: 'AUTH_USER_SET', authUser})
  });

  return compose(
    withFirebase,
    withRouter,
    connect(
      null,
      mapDispatchToProps
    )
  )(WithAuthentication);
};

export default withAuthentication;
