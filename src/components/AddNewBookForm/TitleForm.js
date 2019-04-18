import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeNewBook} from '../../redux/actions/addNewUserBook';
import {fetchBookTitleSuggestions} from '../../redux/actions/bookTitleSuggestions';

import Autocomplete from '../Autocomplete/Autocomplete';
import {throttle} from '../../helpers/utils';

const TitleForm = props => {
  const getBookTitle = throttle(
    query => props.fetchBookTitleSuggestions(query),
    1000
  );

  const handleUserPick = value => {
    let userPick = props.bookTitleSuggestions[value];

    props.changeNewBook({
      title: userPick.bookTitleBare,
      rating: userPick.avgRating,
      author: userPick.author.name
    });
  };

  const getUserInput = val => {
    props.changeNewBook({
      title: val
    });
  };

  return (
    <Autocomplete
      className={props.className}
      isLoading={props.isLoading}
      fetchSuggestions={getBookTitle}
      suggestions={props.bookTitleSuggestions.map(
        suggestion => suggestion.bookTitleBare
      )}
      suggestionsImage={props.bookTitleSuggestions.map(
        suggestion => suggestion.imageUrl
      )}
      suggestionsAuthor={props.bookTitleSuggestions.map(
        suggestion => suggestion.author.name
      )}
      getUserPick={handleUserPick}
      placeholder="Book Title"
      getUserInput={getUserInput}
    />
  );
};

TitleForm.propTypes = {
  bookTitleSuggestions: PropTypes.array,
  changeNewBook: PropTypes.func,
  className: PropTypes.string,
  fetchBookTitleSuggestions: PropTypes.func,
  isLoading: PropTypes.bool,
  newBook: PropTypes.object
};

const mapStateToProps = state => ({
  bookTitleSuggestions: state.bookState.bookTitleSuggestions,
  isLoading: state.bookState.isLoading,
  newBook: state.userBookState.newBook
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchBookTitleSuggestions, changeNewBook}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleForm);
