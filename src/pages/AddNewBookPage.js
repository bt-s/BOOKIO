import React, {useState} from 'react';
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
        <div className="text">{file.name}</div>
        <button onClick={() => removeFiles(i)}>
          <FontAwesomeIcon icon="times-circle" />
        </button>
      </div>
    );
  };

  return (
    <div className="add-book-page">
      <h1 className="add-book-page-title"> Share New Book </h1>
      <div className="subtitle">Images</div>
      <div className="image-box-container">
        {files.map((file, i) => {
          return ImageBox(file, i);
        })}
        <DragAndDrop handleDrop={handleDrop} />
      </div>
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
