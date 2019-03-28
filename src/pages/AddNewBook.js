import React, {useState} from 'react';
import AddNewBookForm from '../components/AddNewBookForm/AddNewBookForm';
import DragAndDrop from '../components/AddNewBookForm/DragAndDrop';
import TitleForm from '../components/AddNewBookForm/TitleForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewUserBook} from '../redux/actions/addNewUserBook';

const AddNewBook = props => {
  const [files, setFiles] = useState([]);

  const handleDrop = payload => {
    let fileList = [...files];
    for (var i = 0; i < payload.length; i++) {
      if (!payload[i].name) return;
      fileList.push(payload[i].name);
    }
    setFiles(fileList);
  };

  const removeFiles = i => {
    let fileList = [...files];
    fileList.splice(i, 1);
    setFiles(fileList);
  };

  const ImageBox = (file, i) => {
    return (
      <div className="image-box" key={i}>
        <div className="text">{file}</div>
        <button className="btn-remove" onClick={() => removeFiles(i)}>
          Remove
        </button>
      </div>
    );
  };

  //TOOO: Drag to change the order of the uploaded

  return (
    <React.Fragment>
      <div className="add-book">
     
      <div className="add-book-container">
      <h1> Add New Book Page</h1>
      <div className="subtitle">Images</div>
      {files.map((file, i) => {
        return ImageBox(file, i);
      })}
      <DragAndDrop handleDrop={handleDrop} />
      <div className="subtitle">Book Title</div>
      <TitleForm />
      <div className="subtitle">Description</div>
      <AddNewBookForm />
      </div>
      <div className="type-book-container">
      <div className="subtitle">Type</div>
      <input className="type" type="text" ></input>
      <div className="subtitle">Pick up Location</div>
      <input className="pick-location" type="text" ></input>
      <div className="subtitle">Contact Info</div>
      <input className="contact-info" type="text" ></input>
      <button className="btn-publish">Publish </button>
      </div>
      </div>
    </React.Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewBook);
