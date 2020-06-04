import React from 'react';

import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import OlMap from 'ol/Map';
import Tile from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import OSM from 'ol/source/OSM';
import { Attribution, Zoom, ZoomSlider } from 'ol/control';
import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { Circle, Stroke, Style } from 'ol/style';

import PropTypes from 'prop-types';

require('ol/ol.css');

const makeMarkers = (markersCoords) => (
  markersCoords.map(({ lat, lon }) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
    });
    feature.setStyle(new Style({
      image: new Circle({
        stroke: new Stroke({
          color: '#ff0000',
          width: 1.25,
        }),
        radius: 5,
      }),
    }));
    return feature;
  })
);

const view = new View({
  center: fromLonLat([19, 49]),
  zoom: 2,
  minZoom: 2,
  maxZoom: 28,
});

const OpenLayersMap = ({ markers = [] }) => {
  const features = makeMarkers(markers);

  // eslint-disable-next-line no-unused-vars
  const map = new OlMap({
    view,
    controls: [
      new Attribution(),
      new Zoom(),
      new ZoomSlider(),
    ],
    layers: [
      new Tile({ source: new OSM() }),
      new VectorLayer({
        source: new VectorSource({
          features,
        }),
      }),
    ],
    target: 'mapContainer',
  });

  return (
    <div id="mapContainer"> </div>
  );
};

export default OpenLayersMap;

OpenLayersMap.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  })),
};

OpenLayersMap.defaultProps = {
  markers: [],
};
