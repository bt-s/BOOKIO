import React from 'react';
import {connect} from 'react-redux';
import {getData} from '../../redux/actions/index';

export class Post extends React.Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <ul>
        {this.props.books.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.remoteBooks.slice(0, 10)
  };
}

export default connect(
  mapStateToProps,
  {getData}
)(Post);
