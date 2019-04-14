import React, {useEffect, useState} from 'react';
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

  const handleImageUploaded = url => {
    let imageUrlsTemp = [...imageUrls];
    imageUrlsTemp.push(url);
    imageUrls = [...imageUrlsTemp];
    console.log(imageUrlsTemp);
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
        owner: JSON.parse(localStorage.getItem('authUser')).uid,
        rating: parseFloat(rating),
        description,
        author,
        location,
        imageUrls,
        type: 'lend',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      })
      .then(res => {
        console.log(res.id);
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
          console.log(imageUrls);
          console.log(res.id);
          updateImage(res.id);
          setProgressStyle('redirect');
          setTimeout(() => {
            //go back to homepage after uploading
            props.history.push('/');
          }, 2000);
        });
      })
      .catch(() => {
        addNewUserBook('error');
      });
  };

  const handleSubmit = () => {
    addNewUserBook('loading');
    console.warn('[ADD_NEW_BOOK] Calling API to add New Book');
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
        <div className="subtitle">Author</div>
        <input
          className="title-input"
          type="text"
          onChange={e =>
            changeNewBook({
              author: e.target.value
            })
          }
          value={author}
        />
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
          value={type}
          onChange={e => setType(e.target.value)}>
          <option value="lend">Lend</option>
          <option value="giveaway">Giveaway</option>
        </select>

        <div className="subtitle">Location</div>
        <Map
          style={{width: '40%', height: '200px'}}
          zoom={15}
          coord={location}
          getCoord={changeLocation}
          initCoord={initLocation}
        />

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

const mapStateToProps = state => {
  return {
    title: state.userBookState.newBook.title,
    rating: state.userBookState.newBook.rating,
    author: state.userBookState.newBook.author
  };
};

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
