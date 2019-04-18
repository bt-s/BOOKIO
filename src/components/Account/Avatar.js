import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {uploadPictureToFirebase} from '../../helpers/storageHelper';

const Avatar = props => {
  const [statusText, setStatusText] = useState('Edit');
  const [imgURL, setImgURL] = useState('');

  const postUploadTask = url => {
    props.firebase.auth.currentUser
      .updateProfile({
        photoUrl: url
      })
      .then(function() {
        setStatusText('Edit');

        setImgURL(url);
        props.firebase.user(props.firebase.getMyUID()).update({photoUrl: url});
      });
  };

  return (
    <div className="avatar-container">
      <img
        className="avatar"
        src={imgURL === '' ? props.avatarUrl : imgURL}
        alt=""
      />
      <label className="change-avatar">
        <FontAwesomeIcon icon="pencil-alt" />
        {statusText}
        <input
          type="file"
          name=""
          onChange={e => {
            uploadPictureToFirebase(
              e.target.files[0],
              'portrait_images',
              props.firebase,
              postUploadTask,
              status => {
                setStatusText((parseFloat(status) * 100).toFixed(2) + '%');
              }
            );
          }}
          id=""
          style={{display: 'none'}}
        />
      </label>
    </div>
  );
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  firebase: PropTypes.object
};

export default withFirebase(Avatar);
