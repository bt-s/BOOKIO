import {STORE_COORDS} from '../constants/action-types';

export const storeCoords = coords => ({
  type: STORE_COORDS,
  coords
});
