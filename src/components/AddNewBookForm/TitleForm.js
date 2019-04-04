import React, {useEffect} from 'react';
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

  useEffect(() => {
    // TODO: Get location from props and set the location state here
    // TODO: set the owner state with ID from local storage
  });

  const handleUserPick = value => {
    let userPick = props.bookTitleSuggestions[value];
    props.changeNewBook({
      title: userPick.bookTitleBare,
      rating: userPick.avgRating,
      author: userPick.author.name
    });
  };

  return (
    <React.Fragment>
      <Autocomplete
        isLoading={props.isLoading}
        fetchSuggestions={getBookTitle}
        suggestions={props.bookTitleSuggestions.map(
          suggestion => suggestion.bookTitleBare
        )}
        suggestionsImage={props.bookTitleSuggestions.map(
          suggestion => suggestion.imageUrl
        )}
        getUserPick={handleUserPick}
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
