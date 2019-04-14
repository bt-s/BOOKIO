import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';

const LoadingContainer = props => <Loader />;

export const MapContainer = props => {
  const style = props.style;
  const [initialCoordinates, setInitialCoordinates] = useState({
    lat: 59.3473154,
    lng: 18.0732396
  });
  const [markerCoordinates, setMarkerCoordinates] = useState({
    lat: 59.3473154,
    lng: 18.073239
  });

  useEffect(() => {
    setMarkerCoordinates({
      lat: props.coord.lat,
      lng: props.coord.lon
    });
  }, [props.coord]);

  useEffect(() => {
    console.log(props.initCoord);
    setInitialCoordinates({
      lat: props.initCoord.lat,
      lng: props.initCoord.lon
    });
  }, [props.initCoord]);

  const onMapClicked = (mapProps, map, coord) => {
    const {latLng} = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    props.getCoord({lat: lat, lon: lng});
  };

  const locationName = 'Your Location';

  return (
    <Map
      google={props.google}
      containerStyle={{...style, position: 'relative'}}
      initialCenter={initialCoordinates}
      center={initialCoordinates}
      zoom={props.zoom}
      onClick={onMapClicked}>
      <Marker name={locationName} position={markerCoordinates} />
    </Map>
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

GoogleMap.propTypes = {
  getCoord: PropTypes.func,
  style: PropTypes.object,
  zoom: PropTypes.number,
  coord: PropTypes.object,
  initCoord: PropTypes.object
};

export default GoogleMap;
