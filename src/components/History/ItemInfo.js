import React from 'react';
import PropTypes from 'prop-types';

const ItemInfo = props => {
  return (
    <div className="item-info">
      <img src={props.imgURL} alt={props.imgURL} />
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
  supplement: PropTypes.object //
};
ItemInfo.defaultProps = {
  // imgURL: reactJPG,
  title: 'Book Title',
  status: 'Requesting'
  // supplement: 'Duration: 1-23 Mar. 2019'
};

export default ItemInfo;
