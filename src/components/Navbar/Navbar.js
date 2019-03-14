import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {
  faUser,
  faBook,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import BrandLogo from '../BrandLogo/BrandLogo';
import Button from '../Button/Button';
import SignOut from '../Authentication/SignOut';

const bookShelfLink = (
  <Link to={ROUTES.MY_BOOK_HISTORY} className="navbar-bookshelves">
    <FontAwesomeIcon icon={faBook} />
  </Link>
);

const accountLink = (
  <Link to={ROUTES.ACCOUNT} className="navbar-account">
    <FontAwesomeIcon icon={faUser} />
  </Link>
);

const NavbarAuth = ({authUser}) =>
  authUser.roles.includes(ROLES.ADMIN) && authUser.emailVerified ? (
    <React.Fragment>
      {bookShelfLink}
      {accountLink}
      <Link to={ROUTES.ADMIN} className="navbar-admin">
        Admin
      </Link>
      <SignOut />
    </React.Fragment>
  ) : (
    <React.Fragment>
      {bookShelfLink}
      {accountLink}
      <SignOut />
    </React.Fragment>
  );

const NavbarNonAuth = () => (
  <div className="navbar-authentication">
    <Link to={ROUTES.LOG_IN} className="login">
      LOG IN
    </Link>
    <span className="spacer" />
    <Link to={ROUTES.SIGN_UP} className="register">
      REGISTER
    </Link>
  </div>
);

const Navbar = props => {
  const [showMenu, setShowMenu] = useState(false);

  const onMenuToggle = e => {
    setShowMenu(!showMenu);
  };

  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const mobileBreakPoint = 768;

  const itemSearchBar = (
    <div className="navbar-search-container">
      A search component will be inserted here...
    </div>
  );

  const mobileMenuButton = (
    <Button
      className="navbar-mobile-menu"
      onClick={onMenuToggle}
      icon={
        <React.Fragment>
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faTimes} />
        </React.Fragment>
      }
    />
  );

  let providerId;
  if (props.authUser) {
    providerId = props.authUser.providerData[0].providerId;
  }

  return (
    <nav className={showMenu ? 'navbar mobile-menu-open' : 'navbar'}>
      <div className="navbar-content-container">
        <BrandLogo />
        {itemSearchBar}
        {props.authUser ? (
          <NavbarAuth authUser={props.authUser} />
        ) : (
          <NavbarNonAuth />
        )}
        {screenWidth < mobileBreakPoint ? mobileMenuButton : null}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoLeft: PropTypes.string,
  logoRight: PropTypes.string
};

Navbar.defaultProps = {
  logoLeft: 'BOOK',
  logoRight: 'IO'
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default withRouter(connect(mapStateToProps)(Navbar));
