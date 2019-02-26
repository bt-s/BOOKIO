import React from 'react';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import {googleAPIKey} from '../APIKeys/APIKeys';

import Loader from '../Loader/Loader';

const LoadingContainer = props => <Loader />;

export class MapContainer extends React.Component {
  render() {
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
        google={this.props.google}
        style={style}
        initialCenter={initialCoordinates}
        zoom={12}>
        <Marker name={locationName} />
      </Map>
    );
  }
}

const GoogleMap = GoogleApiWrapper({
  apiKey: googleAPIKey,
  LoadingContainer: LoadingContainer
})(MapContainer);

export default GoogleMap;
