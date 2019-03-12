import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import uuid from 'uuid/v1';
import {throttle} from '../../helper/helper';

import {addNewUserBook} from '../../redux/actions/addNewUserBook';
import {fetchBookTitleSuggestions} from '../../redux/actions/bookTitleSuggestions';

import Button from '../Button/Button';

class AddNewBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBook: {
        title: '',
        owner: '',
        rating: '',
        description: '',
        author: '',
        location: {},
        imageURL: ''
      },
      suggestions: []
    };
    this.getBookTitle = throttle(
      query => this.props.fetchBookTitleSuggestions(query),
      700
    );
  }

  /**
   * @function handleSubmit
   * @description handle all to be submitted data and pass it to redux action
   */
  handleSubmit = e => {
    e.preventDefault();
  };

  handleTitleSuggestions = e => {
    this.setState({
      ...this.state,
      newBook: {
        ...this.state.newBook,
        title: e.target.value
      }
    });
    this.getBookTitle(e.target.value);
  };

  /**
   * @function handleChangeForm
   * @description change state value when there is a change in form
   */
  handleChangeForm = e => {
    this.setState({
      ...this.state,
      newBook: {
        ...this.state.newBook,
        [e.target.name]: e.target.value
      }
    });
  };

  componentDidMount() {
    // TODO: Get location from props and set the location state here
    // TODO: set the owner state with ID from local storage

    // Below is just dummy to set location and ID from local storage
    this.setState({
      ...this.state,
      newBook: {
        ...this.state.newBook,
        owner: uuid(),
        location: {}
      }
    });
  }

  render() {
    const {newBook} = this.state;

    return (
      <React.Fragment>
        <h1> Add New Book Page</h1>

        <form onSubmit={this.handleSubmit}>
          {/* TODO: Drop to upload image */}
          <label>
            Title:
            <input
              placeholder="Book Title"
              name="title"
              type="text"
              value={newBook.title}
              onChange={this.handleTitleSuggestions}
            />
          </label>
          <label>
            Description:
            <textarea
              placeholder="Description"
              name="description"
              type="text"
              value={newBook.description}
              onChange={this.handleChangeForm}
            />
          </label>

          <Button type="submit" text="Add New Book" />
          {newBook.title}
        </form>
        {this.props.isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <ul>
            {this.props.bookTitleSuggestions.map((suggestion, index) => {
              return <li key={index}>{suggestion.bookTitleBare}</li>;
            })}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookTitleSuggestions: state.bookState.bookTitleSuggestions,
    isLoading: state.bookState.isLoading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBookTitleSuggestions,
      addNewUserBook
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewBookForm);
