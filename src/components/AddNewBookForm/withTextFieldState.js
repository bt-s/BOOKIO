import { withStateHandlers } from 'recompose';

/**
 * High order component that will return the initial state and an object containing the state handlers
 * State handler -> return new state when called
 */
const initialState = {
  title: { value: "" },
  rating: { value: "" },
  description: { value: "" },
  imageUrl: { value: "" }
};

const onChangeTitle = props => event => ({
  title: {
    value: event.target.value
  }
});

const onChangeRating = props => event => ({
  rating: {
    value: event.target.value
  }
});

const onChangeDescription = props => event => ({
  description: {
    value: event.target.value
  }
});

const onChangeImageUrl = props => event => ({
  imageUrl: {
    value: event.target.value
  }
});

const withTextFieldState = withStateHandlers(initialState, {
  onChangeDescription,
  onChangeImageUrl,
  onChangeRating,
  onChangeTitle
});

export default withTextFieldState;