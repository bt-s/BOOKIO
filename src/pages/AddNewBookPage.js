import React, {useState, useEffect} from 'react';
import AddNewBookForm from '../components/AddNewBookForm/AddNewBookForm';
import DragAndDrop from '../components/AddNewBookForm/DragAndDrop';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewUserBook} from '../redux/actions/addNewUserBook';
import {withFirebase} from '../components/Firebase';
import {compose} from 'recompose';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AddNewBookBase = props => {
  const [files, setFiles] = useState([]);

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

  const ImageBox = (file, i) => {
    return (
      <div className="image-box" key={i}>
        <img src={URL.createObjectURL(file)} alt={'to be uploaded'} />
        <div className="text">{file.name}</div>
        <button onClick={() => removeFiles(i)}>
          <FontAwesomeIcon icon="times-circle" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    console.log(files);
  });

  //TOOO: Drag to change the order of the uploaded

  return (
    <div className="add-book-page">
      <h1 className="add-book-page-title"> Share New Book </h1>
      <div className="subtitle">Images</div>
      {files.map((file, i) => {
        return ImageBox(file, i);
      })}
      <DragAndDrop handleDrop={handleDrop} />
      <AddNewBookForm files={files} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    newBook: state.userBookState.newBook
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNewUserBook
    },
    dispatch
  );

const AddNewBook = compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default AddNewBook(AddNewBookBase);
