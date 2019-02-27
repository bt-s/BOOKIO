import React from 'react';
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

import Button from '../Button/Button';
import SignOut from '../SignOut/SignOut';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  onMenuToggle = e => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  render() {
    const {showMenu} = this.state;

    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const mobileBreakPoint = 768;

    const brandLogo = <div className="navbar-brand">{this.props.logo}</div>;

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
        onClick={this.onMenuToggle}
        text={
          <React.Fragment>
            <FontAwesomeIcon icon={faBars} />
            <FontAwesomeIcon icon={faTimes} />
          </React.Fragment>
        }
      />
    );

    const signInLink = <Link to={ROUTES.LOG_IN}>Sign in</Link>;
    const signUpLink = <Link to={ROUTES.SIGN_UP}>Sign up</Link>;
    const signOutButton = <SignOut />;

    return (
      <nav className={showMenu ? 'navbar mobile-menu-open' : 'navbar'}>
        <div className="navbar-content-container">
          {brandLogo}
          {itemSearchBar}
          {bookShelfLink}
          {accountLink}
          {screenWidth < mobileBreakPoint ? mobileMenuButton : null}
          {signInLink}
          {signUpLink}
          {signOutButton}
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logo: PropTypes.string
};

NavBar.defaultProps = {
  logo: 'BOOKIO'
};

export default NavBar;
