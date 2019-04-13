import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import BrandLogo from '../BrandLogo/BrandLogo';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import SignOut from '../Authentication/SignOut';

const bookShelfLink = (
  <Link to={ROUTES.MY_BOOK_HISTORY} className="navbar-bookshelves">
    <FontAwesomeIcon icon="book" />
  </Link>
);

const accountMenuList = [
  {
    id: 0,
    title: (
      <Link to={ROUTES.ACCOUNT}>
        <FontAwesomeIcon icon="user" />
        My profile
      </Link>
    ),
    classes: 'link section-ending'
  },
  {
    id: 1,
    title: <Link to={ROUTES.ACCOUNT}>My borrowed books</Link>,
    classes: 'link'
  },
  {
    id: 2,
    title: <Link to={ROUTES.MY_BOOK_HISTORY}>My lended books</Link>,
    classes: 'link'
  },
  {
    id: 3,
    title: <Link to={ROUTES.MY_BOOK_HISTORY}>My gotten books</Link>,
    classes: 'link'
  },
  {
    id: 4,
    title: <Link to={ROUTES.MY_BOOK_HISTORY}>My given books</Link>,
    classes: 'link section-ending'
  },
  {
    id: 5,
    title: <SignOut />,
    classes: 'link'
  }
];

const accountMenu = (
  <Dropdown
    classes="navbar-account"
    headerObject={<FontAwesomeIcon icon="user" />}
    items={accountMenuList}
    defaultShowMenu={false}
  />
);

const NavbarAuth = ({authUser}) =>
  authUser.roles.includes(ROLES.ADMIN) && authUser.emailVerified ? (
    <React.Fragment>
      {bookShelfLink}
      {accountMenu}
      <Link to={ROUTES.ADMIN} className="navbar-admin">
        Admin
      </Link>
    </React.Fragment>
  ) : (
    <React.Fragment>
      {bookShelfLink}
      {accountMenu}
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
          <FontAwesomeIcon icon="bars" />
          <FontAwesomeIcon icon="times" />
        </React.Fragment>
      }
    />
  );

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

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default withRouter(connect(mapStateToProps)(Navbar));
