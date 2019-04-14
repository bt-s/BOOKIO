import React from 'react';
import PropTypes from 'prop-types';

const UserLabel = props => (
  <div className="user-label">
    <img src={props.avatarURL} alt="" />
    <div>{props.userName}</div>
    {props.showBio && <div>{props.bio}</div>}
  </div>
);

UserLabel.propTypes = {
  avatarURL: PropTypes.string,
  bio: PropTypes.string,
  userName: PropTypes.string
};

export default UserLabel;
