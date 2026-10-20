// Verifies the @vis.gl/react-google-maps port of the 2019 GoogleMap
// component. The maps library is mocked - no network, no API key.
import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';

const {mapPropsSeen, markerSeen} = vi.hoisted(() => ({
  mapPropsSeen: {},
  markerSeen: {}
}));

vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({children}) => <div data-testid="api-provider">{children}</div>,
  Map: props => {
    Object.assign(mapPropsSeen, props);
    return (
      <div
        data-testid="map"
        onClick={() =>
          props.onClick &&
          props.onClick({detail: {latLng: {lat: 59.32, lng: 18.05}}})
        }>
        {props.children}
      </div>
    );
  },
  Marker: props => {
    Object.assign(markerSeen, props);
    return <div data-testid="marker" />;
  },
  useMapsLibrary: () => null
}));

import GoogleMap from '../components/GoogleMap/GoogleMap';

describe('GoogleMap (vis.gl port)', () => {
  it('centers on initCoord and places the marker on coord', () => {
    render(
      <GoogleMap
        style={{width: '200px', height: '200px'}}
        zoom={15}
        coord={{lat: 59.35, lon: 18.07}}
        initCoord={{lat: 59.35, lon: 18.07}}
      />
    );
    expect(screen.getByTestId('api-provider')).toBeTruthy();
    expect(mapPropsSeen.zoom).toBe(15);
    expect(mapPropsSeen.center).toEqual({lat: 59.35, lng: 18.07});
    expect(markerSeen.position).toEqual({lat: 59.35, lng: 18.07});
    expect(markerSeen.title).toBe('Your Location');
  });

  it('reports map clicks as {lat, lon} when mapClick is enabled', () => {
    const getCoord = vi.fn();
    render(
      <GoogleMap
        style={{width: '200px', height: '200px'}}
        zoom={15}
        coord={{lat: 0, lon: 0}}
        initCoord={{lat: 0, lon: 0}}
        mapClick={true}
        getCoord={getCoord}
      />
    );
    fireEvent.click(screen.getByTestId('map'));
    expect(getCoord).toHaveBeenCalledWith({lat: 59.32, lon: 18.05});
  });

  it('ignores map clicks when mapClick is disabled', () => {
    const getCoord = vi.fn();
    render(
      <GoogleMap
        style={{width: '200px', height: '200px'}}
        zoom={15}
        coord={{lat: 0, lon: 0}}
        initCoord={{lat: 0, lon: 0}}
        getCoord={getCoord}
      />
    );
    fireEvent.click(screen.getByTestId('map'));
    expect(getCoord).not.toHaveBeenCalled();
  });

  it('renders the autocomplete input only when enabled', () => {
    const {rerender} = render(
      <GoogleMap
        style={{}}
        zoom={10}
        coord={{lat: 0, lon: 0}}
        initCoord={{lat: 0, lon: 0}}
      />
    );
    expect(document.querySelector('.autocomplete-input')).toBeNull();
    rerender(
      <GoogleMap
        style={{}}
        zoom={10}
        coord={{lat: 0, lon: 0}}
        initCoord={{lat: 0, lon: 0}}
        autocomplete={true}
      />
    );
    expect(document.querySelector('.autocomplete-input')).toBeTruthy();
  });
});
