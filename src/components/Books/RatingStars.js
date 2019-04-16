import React from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const RatingStars = props => {
  // Round to nearest half
  const rating = Math.round(props.rating * 2) / 2;
  let output = [];
  // Append all the filled whole stars
  for (let i = rating; i > 0; i--)
    // If there is a half a star, append it
    if (i === 0.5) {
      output.push(<FontAwesomeIcon key={i} icon="star-half" color="#FFAC2D" />);
    } else {
      output.push(<FontAwesomeIcon key={i} icon="star" color="#FFAC2D" />);
    }
  return <div className={props.className || 'rating-star'}>{output}</div>;
};

RatingStars.propTypes = {
  rating: PropTypes.number
};

export default RatingStars;
