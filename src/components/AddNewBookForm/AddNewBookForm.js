import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {addNewUserBook} from '../../redux/actions/addNewUserBook';
import {withFirebase} from '../Firebase';
import {uploadPictureToFirebase} from '../../helpers/storageHelper';
import TitleForm from './TitleForm';

const AddNewBookFormBase = props => {
  const {addNewUserBook, author, title, rating, firebase, files} = props;
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  });
  const [type, setType] = useState('to borrow');
  const [progressStyle, setProgressStyle] = useState('off');
  var imageUrls = [];

  const parseLocation = position => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  };

  const handleImageUploaded = url => {
    imageUrls.push(url);
  };

  const updateImage = id => {
    firebase
      .books()
      .doc(id)
      .update({imageUrls})
      .then(() => {
        addNewUserBook('success');
      });
  };

  const storeData = () => {
    firebase
      .books()
      .add({
        title,
        owner: props.authUser.username,
        avatar: props.authUser.photoURL,
        rating: parseInt(rating),
        description,
        author,
        location,
        imageUrls,
        type,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      })
      .then(res => {
        Promise.all(
          files.map(file =>
            uploadPictureToFirebase(
              file,
              `books/${res.id}`,
              firebase,
              handleImageUploaded
            )
          )
        ).then(() => {
          updateImage(res.id);
          setProgressStyle('redirect');
          setTimeout(() => {
            props.history.push('/books');
          }, 2000);
        });
      })
      .then(res => {
        firebase.onBooksAddedListener();
      })
      .catch(() => {
        addNewUserBook('error');
      });
  };

  const handleSubmit = () => {
    addNewUserBook('loading');
    storeData();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(parseLocation);
  }, []);

  return (
    <div className="add-book-form">
      <div className={'upload-progress ' + progressStyle}>
        <h1>Upload succed, redirecting to homepage.</h1>
      </div>
      <div className="two-col">
        <div className="subtitle">Title</div>
        <TitleForm className="title-input" />
        <div className="subtitle">Description</div>
        <textarea
          className="input-description"
          placeholder="Describe it"
          name="description"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="two-col">
        <div className="subtitle">Category</div>
        <select
          className="booktype"
          type="text"
          onChange={e => setType(e.target.value)}>
          <option value="to borrow">Lend</option>
          <option value="to have">Give away</option>
        </select>
        <button
          className="btn-publish btn"
          onClick={() => {
            setProgressStyle('on');
            handleSubmit();
          }}>
          Publish{' '}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  title: state.userBookState.newBook.title,
  rating: state.userBookState.newBook.rating,
  author: state.userBookState.newBook.author
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({addNewUserBook}, dispatch);

const AddNewBookForm = compose(
  withFirebase,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default AddNewBookForm(AddNewBookFormBase);
