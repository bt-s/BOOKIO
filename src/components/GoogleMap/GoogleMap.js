import React from 'react';
import PropTypes from 'prop-types';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import Loader from '../Loader/Loader';

const LoadingContainer = props => <Loader />;

export const MapContainer = props => {
  const style = {
    width: props.width,
    height: props.height
  };

  console.log(style);

  return (
    <React.Fragment>
      <Map
        google={props.google}
        style={style}
        initialCenter={{
          lat: props.lat,
          lng: props.lng
        }}
        zoom={12}>
        <Marker />
      </Map>
    </React.Fragment>
  );
};

MapContainer.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number
};

const GoogleMap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  LoadingContainer: LoadingContainer
})(MapContainer);

export default GoogleMap;
