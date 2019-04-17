import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {faEdit, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import BrandLogo from '../BrandLogo/BrandLogo';
import Dropdown from '../Dropdown/Dropdown';
import Search from '../Search/Search';
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
        My Profile
      </Link>
    ),
    classes: 'link section-ending'
  },
  {
    id: 1,
    title: (
      <Link to={ROUTES.EDIT_PROFILE}>
        <FontAwesomeIcon icon={faEdit} />
        Edit Profile
      </Link>
    ),
    classes: 'link section-ending'
  },

  {
    id: 1,
    title: (
      <Link to={ROUTES.EDIT_PROFILE}>
        <FontAwesomeIcon icon={faCog} />
        Settings
      </Link>
    ),
    classes: 'link section-ending'
  },
  {
    id: 5,
    title: <SignOut />,
    classes: 'link section-ending'
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
  const [isTop, setIsTop] = useState(true);
  let lastScrollPos = 2000;

  // useEffect(() => {
  //   document.addEventListener('scroll', e => {
  //     // let val = window.scrollY < 100;
  //     if (lastScrollPos - window.scrollY < 0) {
  //       setTimeout(() => setIsTop(false));
  //     } else if (lastScrollPos - window.scrollY > 0) {
  //       setTimeout(() => setIsTop(true));
  //     }
  //     lastScrollPos = window.scrollY;

  //     // setIsTop(val);
  //   });
  // }, []);

  return (
    <nav className={'navbar ' + (isTop ? '' : 'scroll-height')}>
      <div className="navbar-content-container">
        <BrandLogo />
        <Search />;
        {props.authUser ? (
          <NavbarAuth authUser={props.authUser} />
        ) : (
          <NavbarNonAuth />
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default withRouter(connect(mapStateToProps)(Navbar));
