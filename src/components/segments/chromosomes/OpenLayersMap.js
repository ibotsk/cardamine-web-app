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

require('ol/ol.css');

const featureOne = new Feature(new Point(fromLonLat([19, 49])));

class OpenLayersMap extends React.Component {
  constructor(props) {
    super(props);

    this.view = new View({
      center: fromLonLat([19, 49]),
      zoom: 2,
      minZoom: 2,
      maxZoom: 28,
    });
  }

  componentDidMount() {
    this.map = new OlMap({
      view: this.view,
      controls: [
        new Attribution(),
        new Zoom(),
        new ZoomSlider(),
      ],
      layers: [
        new Tile({ source: new OSM() }),
        new VectorLayer({
          source: new VectorSource({
            features: [featureOne],
          }),
        }),
      ],
      target: 'mapContainer',
    });
  }

  render() {
    return (
      <div id="mapContainer"> </div>
    );
  }
}

export default OpenLayersMap;
