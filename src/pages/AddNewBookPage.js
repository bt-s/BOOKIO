import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewUserBook} from '../redux/actions/addNewUserBook';
import {withFirebase} from '../components/Firebase';
import {compose} from 'recompose';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AddNewBookForm from '../components/AddNewBookForm/AddNewBookForm';
import DragAndDrop from '../components/AddNewBookForm/DragAndDrop';
import Button from '../components/Button/Button';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import {
  withAuthorization,
  withEmailVerification
} from '../components/Session/Session';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AddNewBookBase = props => {
  const [files, setFiles] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDrop = payload => {
    let fileList = [...files];
    for (var i = 0; i < payload.length; i++) {
      if (!payload[i].name) return;
      if (fileList.map(val => val.name).indexOf(payload[i].name) !== -1)
        fileList.splice(i, 1);
      fileList.push(payload[i]);
    }
    setFiles(fileList.slice(-3));
  };

  const removeFiles = i => {
    let fileList = [...files];
    fileList.splice(i, 1);
    setFiles(fileList);
  };

  const onDragStart = (e, index) => {
    setDraggedItem(files[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = index => {
    const draggedOverItem = files[index];
    if (draggedItem === draggedOverItem) {
      return;
    }
    let files_temp = files.filter(file => file !== draggedItem);
    files_temp.splice(index, 0, draggedItem);
    setFiles(files_temp);
  };

  const ImageBox = (file, i) => {
    return (
      <div
        className="image-box"
        key={i}
        draggable
        onDragStart={e => onDragStart(e, i)}
        onDragOver={() => onDragOver(i)}>
        <img src={URL.createObjectURL(file)} alt={'to be uploaded'} />
        <Button
          className=""
          onClick={() => removeFiles(i)}
          icon={<FontAwesomeIcon icon="times-circle" />}
        />
      </div>
    );
  };

  return (
    <div className="add-book-page">
      <div className="add-book-page-header">
        <h1 className="add-book-page-title"> Share New Book </h1>
        <Link to={ROUTES.BOOKS} className="btn btn-orange">
          Go to Books Discovery
        </Link>
      </div>
      <div className="subtitle">Images</div>
      <div className="image-box-container">
        <ReactCSSTransitionGroup
          transitionName="image-box-transition"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}>
          {files.map((file, i) => {
            return ImageBox(file, i);
          })}
        </ReactCSSTransitionGroup>
        <DragAndDrop handleDrop={handleDrop} />
      </div>
      <AddNewBookForm files={files} />
    </div>
  );
};

AddNewBookBase.propTypes = {
  addNewUserBook: PropTypes.func,
  authUser: PropTypes.object,
  dispatch: PropTypes.func,
  firebase: PropTypes.object,
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  location: PropTypes.object,
  match: PropTypes.object,
  newBook: PropTypes.object
};

const mapStateToProps = state => {
  return {
    newBook: state.userBookState.newBook,
    isLoading: state.userBookState.isLoading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({addNewUserBook}, dispatch);

const AddNewBook = compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default compose(
  withAuthorization(authUser => !!authUser),
  withEmailVerification
)(AddNewBook(AddNewBookBase));
