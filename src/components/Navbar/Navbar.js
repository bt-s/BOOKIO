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

import {ACCOUNT, MY_BOOK_HISTORY} from '../../routes';

import Button from '../Button/Button';

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

    return (
      <nav className={showMenu ? 'navbar mobile-menu-open' : 'navbar'}>
        <div className="navbar-content-container">
          <div className="navbar-brand">{this.props.logo}</div>
          <div className="navbar-search-container">
            A search component will be inserted here.
          </div>
          <Link to={MY_BOOK_HISTORY} className="navbar-bookshelves">
            <FontAwesomeIcon icon={faBook} />
          </Link>
          <Link to={ACCOUNT} className="navbar-account">
            <FontAwesomeIcon icon={faUser} />
          </Link>
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
