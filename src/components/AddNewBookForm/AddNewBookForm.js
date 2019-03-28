import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {addNewUserBook} from '../../redux/actions/addNewUserBook';
import {withFirebase} from '../Firebase';
import Button from '../Button/Button';

const AddNewBookForm = props => {
  const {addNewUserBook, author, title, rating, firebase} = props;
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0
  });

  const parseLocation = position => {
    setLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  };

  const handleSubmit = () => {
    addNewUserBook('loading');
    console.warn('[ADD_NEW_BOOK] Calling API to add New Book');
    firebase
      .books()
      .add({
        title,
        owner: JSON.parse(localStorage.getItem('authUser')).uid,
        rating: parseInt(rating),
        description,
        author,
        location,
        imageURL: '',
        type: 'lend',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      })
      .then(() => {
        addNewUserBook('success');
      })
      .catch(() => {
        addNewUserBook('error');
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(parseLocation);
  }, []);

  return (
    <React.Fragment>
      <textarea
        placeholder="Description"
        name="description"
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <Button
        type="submit"
        text="Add New Book"
        onClick={() => handleSubmit()}
      />
    </React.Fragment>
    
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
      addNewUserBook
    },
    dispatch
  );

const AddNewBookFormCompose = compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default AddNewBookFormCompose(AddNewBookForm);
