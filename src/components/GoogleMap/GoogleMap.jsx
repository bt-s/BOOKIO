// Ported from google-maps-react (unmaintained) + react-google-autocomplete +
// react-geocode to @vis.gl/react-google-maps, the maintained Google Maps
// React library. Same props surface as the 2019 component.
import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {
  APIProvider,
  Map,
  Marker,
  useMapsLibrary
} from '@vis.gl/react-google-maps';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

const PlacesAutocomplete = ({onPlaceSelected, className}) => {
  const places = useMapsLibrary('places');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!places || !inputRef.current) return;
    const autocomplete = new places.Autocomplete(inputRef.current, {
      types: ['address']
    });
    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) onPlaceSelected(place);
    });
    return () => listener.remove();
  }, [places, onPlaceSelected]);

  return <input ref={inputRef} className={className} type="text" />;
};

PlacesAutocomplete.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
  className: PropTypes.string
};

const MapInner = props => {
  const {autocomplete = false, mapClick = false} = props;
  const style = props.style;
  const geocoding = useMapsLibrary('geocoding');
  const [initialCoordinates, setInitialCoordinates] = useState({
    lat: 59.3473154,
    lng: 18.0732396
  });
  const [markerCoordinates, setMarkerCoordinates] = useState({
    lat: 59.3473154,
    lng: 18.073239
  });

  const parseAddress = (lat, lon) => {
    if (!geocoding) return Promise.resolve();
    return new geocoding.Geocoder()
      .geocode({location: {lat, lng: lon}})
      .then(response => {
        const addressArray = response.results[0].address_components;
        return {
          city: getCity(addressArray),
          address: response.results[0].formatted_address
        };
      })
      .catch(error => console.error(error));
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

  const onMapClicked = ev => {
    if (mapClick && ev.detail.latLng) {
      const {lat, lng} = ev.detail.latLng;
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
      {autocomplete && (
        <PlacesAutocomplete
          className="autocomplete-input"
          onPlaceSelected={onPlaceSelected}
        />
      )}
      <div style={{...style, position: 'relative'}}>
        <Map
          style={{width: '100%', height: '100%'}}
          center={initialCoordinates}
          zoom={props.zoom}
          onClick={onMapClicked}>
          <Marker title={locationName} position={markerCoordinates} />
        </Map>
      </div>
    </div>
  );
};

MapInner.propTypes = {
  style: PropTypes.object,
  zoom: PropTypes.number,
  coord: PropTypes.object,
  getCoord: PropTypes.func,
  initCoord: PropTypes.object,
  autocomplete: PropTypes.bool,
  mapClick: PropTypes.bool,
  getAddress: PropTypes.func
};


const GoogleMap = props => (
  <APIProvider apiKey={apiKey}>
    <MapInner {...props} />
  </APIProvider>
);

GoogleMap.propTypes = {
  getCoord: PropTypes.func,
  style: PropTypes.object,
  zoom: PropTypes.number,
  coord: PropTypes.object,
  initCoord: PropTypes.object,
  getAddress: PropTypes.func,
  autocomplete: PropTypes.bool,
  mapClick: PropTypes.bool
};

export default GoogleMap;
