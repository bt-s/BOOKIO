import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {withFirebase} from '../Firebase';

import steve from '../../images/stevejobs.jpg';

import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Dropdown from '../Dropdown/Dropdown';

const Avatar = props => {
  const [selectedFile, setSelectedFile] = useState({});
  const [isSelected, setSelected] = useState(false);
  const [imgURL, setImgURL] = useState('');

  var storageRef = props.firebase.storage().ref();

  const handleSelectedFile = e => {
    setSelectedFile(e.target.files[0]);
    setSelected(true);
  };

  const handleFileUpload = () => {
    const data = new FormData();
    data.append('file', selectedFile, selectedFile.name);

    // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Create image location in Firebase storage
    const imgLocation = 'images/' + selectedFile.name;

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(imgLocation).put(selectedFile, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      props.firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and
        // the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case props.firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case props.firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      }
    );

    // Create a reference to the file we want to download
    const imageRef = storageRef.child(imgLocation);

    // Get the download URL
    imageRef
      .getDownloadURL()
      .then(function(url) {
        setImgURL(url);
      })
      .catch(function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          default:
            break;
        }
      });
  };

  const uploadField = [
    {
      id: 0,
      title: !isSelected ? (
        <label>
          Upload a photo...
          <input
            type="file"
            name=""
            onChange={handleSelectedFile}
            id=""
            style={{display: 'none'}}
          />
        </label>
      ) : (
        <button onClick={handleFileUpload}>Upload</button>
      ),
      classes: 'link avatar-upload'
    }
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
  avatarURL: PropTypes.string
};

Avatar.defaultProps = {
  avatarURL: steve
};

export default withFirebase(Avatar);
