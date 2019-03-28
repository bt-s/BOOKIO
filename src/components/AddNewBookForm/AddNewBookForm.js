import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeNewBook} from '../../redux/actions/addNewUserBook';


const AddNewBookForm = props => {
  const {newBook, changeNewBook} = props;

  const handleChangeForm = e => {
    changeNewBook(e.target);
  };

  useEffect(() => {
    // TODO: Get location from props and set the location state here
    // TODO: set the owner state with ID from local storage
  });

  return (
    <React.Fragment>
      <input className="description" type="text" 
      value={newBook.description}
      onChange={handleChangeForm} 
      placeholder="Description">
      </input>
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
      changeNewBook
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewBookForm);
