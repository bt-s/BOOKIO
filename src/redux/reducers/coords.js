import {STORE_COORDS} from '../constants/action-types';

const coordsReducer = (state = {coords: {lat: 0, lng: 0}}, action) => {
  switch (action.type) {
    case STORE_COORDS:
      return {...state, coords: action.coords};

    default:
      return state;
  }
};

export default coordsReducer;
