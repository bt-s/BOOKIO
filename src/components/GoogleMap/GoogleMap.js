import React from 'react';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

// import {googleAPIKey} from '../APIKeys/APIKeys';

import Loader from '../Loader/Loader';

const LoadingContainer = props => <Loader />;

export const MapContainer = props => {
  const style = {
    width: '300px',
    height: '300px'
  };

  const initialCoordinates = {
    lat: 59.3498,
    lng: 18.0707
  };

  const locationName = 'KTH, Stockholm';

  return (
    <Map
      google={props.google}
      style={style}
      initialCenter={initialCoordinates}
      zoom={12}>
      <Marker name={locationName} />
    </Map>
  );
};

const GoogleMap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  LoadingContainer: LoadingContainer
})(MapContainer);

export default GoogleMap;
