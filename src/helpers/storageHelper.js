/*
  @callback(param):
  if provided, it will be called with
  a url to picture uploaded as the parameter
  @monitor(param):
  this function is used for the caller of this function 
  to know about the status of uploading
*/
export const uploadPictureToFirebase = (
  fileObj,
  remoteFolder,
  firebase,
  callback = false,
  monitor = false
) => {
  const storageRef = firebase.storage().ref();
  const data = new FormData();
  data.append('file', fileObj, fileObj.name);

  // Create the file metadata
  const metadata = {
    contentType: 'image/jpeg',
  };

  // Create image location in Firebase storage
  const imgLocation = remoteFolder + '/' + fileObj.name;

  // Upload file and metadata to the object 'images/mountains.jpg'
  let uploadTask = storageRef.child(imgLocation).put(fileObj, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and
      // the total number of bytes to be uploaded
      let progress =
        ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2) +
        '%';
      if (monitor) {
        monitor(progress);
      }
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
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
        if (monitor) {
          monitor('Upload a photo...');
        }
        if (callback) {
          console.log('Executing your callback', callback, '\n');
          callback(downloadURL);
        }
      });
    }
  );
};
