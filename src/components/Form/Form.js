import React, {useState} from 'react';
import {connect} from 'react-redux';
import uuidv1 from 'uuid';
import {addBook} from '../../redux/actions/index';

const ConnectedForm = props => {
  const [title, setTitle] = useState('');

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = uuidv1();
    props.addBook({title, id});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={handleChange} />
      </div>
      <button type="submit">SAVE</button>
    </form>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    addBook: book => dispatch(addBook(book))
  };
}

const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form;
