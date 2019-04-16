export const uploadPictureToFirebase = (
  fileObj,
  remoteFolder,
  firebase,
  callback = false,
  monitor = false
) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();
    const data = new FormData();
    data.append('file', fileObj, fileObj.name);

    // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Create image location in Firebase storage
    const imgLocation = remoteFolder + '/' + fileObj.name;

    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = storageRef.child(imgLocation).put(fileObj, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and
        // the total number of bytes to be uploaded
        let progress =
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2) /
          100;
        if (monitor) {
          monitor(progress);
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.error('Storage unauthorized: ', error);
            break;

          case 'storage/canceled':
            // User canceled the upload
            console.error('Storage cancelled: ', error);
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.error('Unknown error : ', error);
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          if (monitor) {
            // 100% uploaded
            monitor(1);
          }
          if (callback) {
            callback(downloadURL);
          }
          resolve();
        });
      }
    );
  });
};
