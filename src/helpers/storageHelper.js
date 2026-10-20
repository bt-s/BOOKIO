// Ported to the modular Firebase Storage SDK: uploadBytesResumable plus
// getDownloadURL instead of the v5 namespaced ref().child().put() API.
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

export const uploadPictureToFirebase = (
  fileObj,
  remoteFolder,
  firebase,
  callback = false,
  monitor = false
) => {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: 'image/jpeg'
    };

    const imgLocation = remoteFolder + '/' + fileObj.name;
    const uploadTask = uploadBytesResumable(
      storageRef(firebase.storage, imgLocation),
      fileObj,
      metadata
    );

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2) /
          100;
        if (monitor) {
          monitor(progress);
        }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      error => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.error('Storage unauthorized: ', error);
            break;
          case 'storage/canceled':
            console.error('Storage cancelled: ', error);
            break;
          case 'storage/unknown':
            console.error('Unknown error : ', error);
            break;
          default:
            break;
        }
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          if (monitor) {
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
