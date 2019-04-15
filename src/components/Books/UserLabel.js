import React from 'react';
import PropTypes from 'prop-types';

const UserLabel = props => (
  <div className="user-label">
    <img src={props.avatarUrl} alt="" />
    <div>{props.userName}</div>
    {props.showBio && <div>{props.bio}</div>}
  </div>
);

UserLabel.propTypes = {
  avatarUrl: PropTypes.string,
  bio: PropTypes.string,
  userName: PropTypes.string
};

export default UserLabel;
