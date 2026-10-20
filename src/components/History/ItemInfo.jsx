import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const ItemInfo = ({title = 'Book Title', status = 'Requested', ...props}) => (
  <div className="item-info">
    <Link to={'/detail/' + props.bookId}>
      <img src={props.imgURL} alt={title} />
    </Link>
    <div className="part-b">
      <div className="title-and-status">
        <div className="title">{title}</div>
        <div className="status">
          Status: <i>{status}</i>
        </div>
      </div>
      <div className="supplement">{props.supplement}</div>
    </div>
  </div>
);

ItemInfo.propTypes = {
  imgURL: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,
  supplement: PropTypes.object,
  bookId: PropTypes.string
};


export default ItemInfo;
