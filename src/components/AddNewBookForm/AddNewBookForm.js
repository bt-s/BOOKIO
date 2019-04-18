import React, {useEffect, useState, useReducer, useRef} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {
  addNewUserBook,
  changeNewBook
} from '../../redux/actions/addNewUserBook';
import {withFirebase} from '../Firebase';
import {uploadPictureToFirebase} from '../../helpers/storageHelper';
import TitleForm from './TitleForm';
import Map from '../GoogleMap/GoogleMap';
import {Validation, Validator, ValidationHelper} from '../Forms/Validation';
import {errorReducer} from '../../helpers/validationHelper';

const AddNewBookFormBase = props => {
  const {
    addNewUserBook,
    changeNewBook,
    author,
    title,
    rating,
    firebase,
    files
  } = props;
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  });

  const [initLocation, setInitLocation] = useState({
    lat: 0,
    lon: 0
  });
  const [type, setType] = useState('lend');

  const [progressStyle, setProgressStyle] = useState('off');
  let imageUrls = [];
  const [error, dispatchError] = useReducer(errorReducer, {});
  const validationRef = useRef(null);

  const onValidate = error => {
    dispatchError(error);
  };

  const parseLocation = position => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
    setInitLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  };

  const changeLocation = loc => {
    setLocation(loc);
  };

  const getAddress = val => {
    // Here if you want to get the address and the city.
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
    setProgressStyle('on');
    firebase
      .books()
      .add({
        title,
        ownerId: props.authUser.uid,
        owner: props.authUser.username,
        //owner: JSON.parse(localStorage.getItem('authUser')).uid,
        avatar: props.authUser.photoUrl,
        rating: parseFloat(rating),
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
            window.location = '/books';
          }, 3000);
        });
      })
      .then(res => {
        firebase.onBooksAddedListener();
      })
      .catch(() => {
        addNewUserBook('error');
      });
  };

  const validate_image = () => {
    if (files.length === 0) {
      let image = '*Book Image is required';
      dispatchError({image});
    } else {
      dispatchError({image: ''});
    }
  };

  const handleSubmit = e => {
    addNewUserBook('loading');
    const allErrors = validationRef.current.validate();
    allErrors.image = error.image;
    validate_image();
    if (Object.values(allErrors).join('') === '') {
      console.warn('[ADD_NEW_BOOK] Calling API to add New Book');
      storeData();
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(parseLocation);
    dispatchError({image: ''});
    addNewUserBook('loading');
  }, []);

  return (
    <div className="add-book-form">
      <div className={'upload-progress ' + progressStyle}>
        <h1>Upload succed, redirecting to homepage.</h1>
      </div>
      <Validation ref={validationRef}>
        {error.image !== '' && (
          <span
            id="error-image"
            className="validation-error margin-bottom-10px">
            {error.image}
          </span>
        )}
        <div className="two-col">
          <div className="subtitle">Title</div>
          <Validator
            name="title"
            value={title}
            validations={[ValidationHelper.required('*Book Title is required')]}
            onValidate={onValidate}>
            <TitleForm className="title-input" />
          </Validator>
          {error.title && (
            <span className="validation-error">{error.title}</span>
          )}
          <div className="subtitle">Author</div>
          <Validator
            name="author"
            value={author}
            validations={[
              ValidationHelper.required('*Book Author is required')
            ]}
            onValidate={onValidate}>
            <input
              className="title-input"
              placeholder="Book Author"
              type="text"
              onChange={e =>
                changeNewBook({
                  author: e.target.value
                })
              }
              value={author}
            />
          </Validator>
          {error.author && (
            <span className="validation-error">{error.author}</span>
          )}
          <div className="subtitle">Description</div>
          <Validator
            name="description"
            value={description}
            validations={[
              ValidationHelper.required('*Book Description is required')
            ]}
            onValidate={onValidate}>
            <textarea
              className="input-description"
              placeholder="Please give description about the book (e.g condition, your personal opinion about the book)"
              name="description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Validator>
          {error.description && (
            <span className="validation-error">{error.description}</span>
          )}
        </div>
        <div className="two-col">
          <div className="subtitle">Category</div>
          <select
            className="booktype"
            type="text"
            value={type}
            onChange={e => setType(e.target.value)}>
            <option value="lend">Lend Out</option>
            <option value="give">Giveaway</option>
          </select>

          <div className="subtitle">Location</div>
          <Map
            style={{
              width: '100%',
              height: '200px',
              position: 'relative',
              border: '1px solid #d1d5da',
              borderRadius: '6px',
              overflow: 'hidden'
            }}
            zoom={15}
            coord={location}
            getCoord={changeLocation}
            initCoord={initLocation}
            autocomplete={true}
            mapClick={true}
            getAddress={getAddress}
          />

          <button
            className="btn btn-black btn-publish" // this is not a regular button
            onClick={e => {
              e.preventDefault();
              handleSubmit(e);
            }}>
            Publish{' '}
          </button>
        </div>
      </Validation>
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
  bindActionCreators(
    {
      addNewUserBook,
      changeNewBook
    },
    dispatch
  );

const AddNewBookForm = compose(
  withFirebase,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default AddNewBookForm(AddNewBookFormBase);
