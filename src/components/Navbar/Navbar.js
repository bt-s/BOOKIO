import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {
  faUser,
  faBook,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../routes';

import {AuthUserContext} from '../Session/Session';
import Button from '../Button/Button';
import SignOut from '../SignOut/SignOut';

const NavbarAuth = () => <SignOut />;

const NavbarNonAuth = () => (
  <React.Fragment>
    <Link to={ROUTES.LOG_IN}>Sign in</Link>;
    <Link to={ROUTES.SIGN_UP}>Sign up</Link>;
  </React.Fragment>
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

  const brandLogo = <div className="navbar-brand">{props.logo}</div>;

  const itemSearchBar = (
    <div className="navbar-search-container">
      A search component will be inserted here.
    </div>
  );

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

  const mobileMenuButton = (
    <Button
      className="navbar-mobile-menu"
      onClick={onMenuToggle}
      text={
        <React.Fragment>
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faTimes} />
        </React.Fragment>
      }
    />
  );

  return (
    <nav className={showMenu ? 'navbar mobile-menu-open' : 'navbar'}>
      <div className="navbar-content-container">
        {brandLogo}
        {itemSearchBar}
        {bookShelfLink}
        {accountLink}
        {screenWidth < mobileBreakPoint ? mobileMenuButton : null}
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <NavbarAuth /> : <NavbarNonAuth />)}
        </AuthUserContext.Consumer>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logo: PropTypes.string
};

Navbar.defaultProps = {
  logo: 'BOOKIO'
};

export default Navbar;
