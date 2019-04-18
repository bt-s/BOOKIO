import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Loader from '../Loader/Loader';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.enableDebug();

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

  // get city
  const getCity = addressArray => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        'postal_town' === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  const parseAddress = (lat, lon) => {
    return Geocode.fromLatLng(lat, lon).then(
      response => {
        let addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          address = response.results[0].formatted_address;
        return {
          city,
          address
        };
      },
      error => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    setMarkerCoordinates({
      lat: props.coord.lat,
      lng: props.coord.lon
    });
  }, [props.coord]);

  useEffect(() => {
    setInitialCoordinates({
      lat: props.initCoord.lat,
      lng: props.initCoord.lon
    });
  }, [props.initCoord]);

  const onMapClicked = (mapProps, map, coord) => {
    if (props.mapClick) {
      const {latLng} = coord;
      const lat = latLng.lat();
      const lng = latLng.lng();
      if (props.getCoord) props.getCoord({lat: lat, lon: lng});
      if (props.getAddress) {
        parseAddress(lat, lng).then(data => {
          props.getAddress(data);
        });
      }
    }
  };

  const onPlaceSelected = place => {
    let address = place.formatted_address,
      addressArray = place.address_components,
      city = getCity(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    if (props.getCoord) {
      props.getCoord({lat: latValue, lon: lngValue});
      setInitialCoordinates({lat: latValue, lng: lngValue});
    }
    if (props.getAddress) props.getAddress({address, city});
  };

  const locationName = 'Your Location';

  return (
    <div className="google-map-container">
      {props.autocomplete && (
        <Autocomplete
          className="autocomplete-input"
          onPlaceSelected={onPlaceSelected}
          types={['address']}
        />
      )}
      <Map
        google={props.google}
        containerStyle={{
          ...style,
          position: 'relative'
        }}
        initialCenter={initialCoordinates}
        center={initialCoordinates}
        zoom={props.zoom}
        onClick={onMapClicked}>
        <Marker name={locationName} position={markerCoordinates} />
      </Map>
    </div>
  );
};

MapContainer.propTypes = {
  style: PropTypes.object,
  zoom: PropTypes.number,
  coord: PropTypes.object,
  getCoord: PropTypes.func,
  initCoord: PropTypes.object,
  autocomplete: PropTypes.bool,
  mapClick: PropTypes.bool
};

MapContainer.defaultProps = {
  autocomplete: false,
  mapClick: false
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
  initCoord: PropTypes.object,
  getAddress: PropTypes.func
};

export default GoogleMap;
