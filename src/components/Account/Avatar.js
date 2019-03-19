import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import steve from '../../images/stevejobs.jpg';

import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Dropdown from '../Dropdown/Dropdown';
import {uploadPictureToFirebase} from '../../helper/StorageHelper';

const Avatar = props => {
  const [statusText, setStatusText] = useState('Upload a photo...');
  const [selectedFile, setSelectedFile] = useState({});
  const [isSelected, setSelected] = useState(false);
  const [imgURL, setImgURL] = useState('');

  var storageRef = props.firebase.storage().ref();

  const handleSelectedFile = e => {
    setSelectedFile(e.target.files[0]);
    setSelected(true);
  };

  const postUploadTask = url => {
    setImgURL(url);
    //link the file to the user
  };

  const uploadField = [
    {
      id: 0,
      title: (
        <label>
          {statusText}
          <input
            type="file"
            name=""
            onChange={e => {
              uploadPictureToFirebase(
                e.target.files[0],
                'images',
                props.firebase,
                postUploadTask,
                status => {
                  setStatusText(status);
                  console.log('monitor executed');
                }
              );
            }}
            id=""
            style={{display: 'none'}}
          />
        </label>
      ),
      classes: 'link avatar-upload',
    },
  ];

  return (
    <div className="avatar-container">
      <img
        className="avatar"
        src={imgURL === '' ? props.avatarURL : imgURL}
        alt=""
      />
      <Dropdown
        classes="edit-avatar"
        headerObject={<FontAwesomeIcon icon={faPencilAlt} />}
        headerTitle="Edit"
        items={uploadField}
      />
    </div>
  );
};

Avatar.propTypes = {
  avatarURL: PropTypes.string,
};

Avatar.defaultProps = {
  avatarURL: steve,
};

export default withFirebase(Avatar);
