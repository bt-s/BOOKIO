import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {throttle} from '../../helpers/utils';

import {changeNewBook} from '../../redux/actions/addNewUserBook';
import {fetchBookTitleSuggestions} from '../../redux/actions/bookTitleSuggestions';
import Autocomplete from '../Autocomplete/Autocomplete';

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
    <React.Fragment>
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
    </React.Fragment>
  );
};

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
      changeNewBook
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleForm);
