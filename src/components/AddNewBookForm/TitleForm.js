import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { throttle } from '../../helpers/utils';

import { changeNewBookTitle } from '../../redux/actions/addNewUserBook';
import { fetchBookTitleSuggestions } from '../../redux/actions/bookTitleSuggestions';
import Autocomplete from '../Autocomplete/Autocomplete';

const TitleForm = props => {
  const getBookTitle = throttle(
    query => props.fetchBookTitleSuggestions(query),
    700
  );


  useEffect(() => {
    // TODO: Get location from props and set the location state here
    // TODO: set the owner state with ID from local storage
  })

  return (
    <React.Fragment>
      <Autocomplete 
        isLoading={props.isLoading}
        fetchSuggestions={getBookTitle}
        suggestions={props.bookTitleSuggestions.map(suggestion => suggestion.bookTitleBare)}
    />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    bookTitleSuggestions: state.bookState.bookTitleSuggestions,
    isLoading: state.bookState.isLoading,
    newBook: state.userBookState.newBook
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBookTitleSuggestions,
      changeNewBookTitle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleForm);
