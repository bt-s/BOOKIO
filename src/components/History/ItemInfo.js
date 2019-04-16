import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Loader from '../Loader/Loader';

const ItemInfo = props => {
  return (
    <div className="item-info">
      <Link to={'/detail/' + props.bookId}>
        <img src={props.imgURL} alt={props.title} />
      </Link>
      <div className="part-b">
        <div className="title-and-status">
          <div className="title">{props.title}</div>
          <div className="status">{props.status}</div>
        </div>
        <div className="supplement">{props.supplement}</div>
      </div>
    </div>
  );
};

ItemInfo.propTypes = {
  imgURL: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
  supplement: PropTypes.object,
  bookId: PropTypes.string
};

ItemInfo.defaultProps = {
  title: 'Book Title',
  status: 'Requesting'
};

export default ItemInfo;
