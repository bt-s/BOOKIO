import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {useFirebase} from '../Firebase';
import {updateProfile} from 'firebase/auth';
import {updateDoc} from 'firebase/firestore';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {uploadPictureToFirebase} from '../../helpers/storageHelper';

const Avatar = props => {
  const firebase = useFirebase();
  const [statusText, setStatusText] = useState('Edit');
  const [imgURL, setImgURL] = useState('');

  const postUploadTask = url => {
    updateProfile(firebase.auth.currentUser, {
      photoURL: url
    }).then(function() {
      setStatusText('Edit');

      setImgURL(url);
      updateDoc(firebase.user(firebase.getMyUID()), {photoUrl: url});
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
              firebase,
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
  avatarUrl: PropTypes.string
};

export default Avatar;
