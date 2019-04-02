import React from 'react';

import steve from '../../images/stevejobs.jpg';

import {faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const UserLabel = props => (
  <div className="user-label">
    <img src={props.avatarURL} />
    <div>
      <div>{props.userName}</div>
      <div>{props.bio}</div>
    </div>
  </div>
);
UserLabel.defaultProps = {
  avatarURL: steve,
  bio: 'klasdjg klasdjglk alsk laksd dk',
  userName: 'Running Man'
};

const RatingStars = props => {
  // Round to nearest half
  const rating = Math.round(props.rating * 2) / 2;
  let output = [];
  // Append all the filled whole stars
  for (let i = rating; i > 0; i--)
    // If there is a half a star, append it
    if (i === 0.5) {
      output.push(<FontAwesomeIcon icon={faStarHalf} color="#FFAC2D" />);
    } else {
      output.push(<FontAwesomeIcon icon={faStar} color="#FFAC2D" />);
    }
  return <div className="rating-star">{output}</div>;
};

const Address = props => {
  return (
    <div className="item-address">
      <span>{props.distance}</span>
      <span className="separator">{props.separator}</span>
      <span>{props.name}</span>
    </div>
  );
};
Address.defaultProps = {
  name: 'KTH',
  separator: '᛫',
  distance: '30m'
};

export {UserLabel, Address, RatingStars};
