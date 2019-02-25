import React from 'react';
import {connect} from 'react-redux';
import uuidv1 from 'uuid';
import {addBook} from '../../redux/actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addBook: book => dispatch(addBook(book))
  };
}

class ConnectedForm extends React.Component {
  constructor() {
    super();

    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {title} = this.state;
    const id = uuidv1();
    this.props.addBook({title, id});
  }

  render() {
    const {title} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}

const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form;
