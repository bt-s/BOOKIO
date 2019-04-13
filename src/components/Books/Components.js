import React from 'react';

import steve from '../../images/stevejobs.jpg';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const UserLabel = props => (
  <div className="user-label">
    <img src={props.avatarURL} alt="" />
    <div>{props.userName}</div>
    {props.showBio && <div>{props.bio}</div>}
  </div>
);

UserLabel.defaultProps = {
  avatarURL: steve,
  bio: 'Lorem ipsum dolor sit amet',
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
      output.push(<FontAwesomeIcon key={i} icon="star-half" color="#FFAC2D" />);
    } else {
      output.push(<FontAwesomeIcon key={i} icon="star" color="#FFAC2D" />);
    }
  return <div className={props.className || 'rating-star'}>{output}</div>;
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
