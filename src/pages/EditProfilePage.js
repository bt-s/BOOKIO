import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
    withAuthorization,
    withEmailVerification,
  } from '../components/Session/Session';

const EditProfilePage = props =>{
    return(
        <React.Fragment>
            Edit Profile
        
           
            
        </React.Fragment>
    )
}
EditProfilePage.propTypes = {
    authUser: PropTypes.object,
  };
  
  const condition = authUser => !!authUser;
  
  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });
  
  export default compose(
    withRouter,
    connect(mapStateToProps),
    withEmailVerification,
    withAuthorization(condition)
  )(EditProfilePage);

