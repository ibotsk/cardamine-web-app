import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import TableRow from '../TableRow';
import CTableRowCoordinates from './CTableRowCoordinates';

const getGeoreferencedCoordinates = (data) => {
  let lat;
  let lon;

  if (data && data.coordinatesGeoref) {
    const { coordinatesGeoref: { coordinates } } = data;
    lat = coordinates.lat;
    lon = coordinates.lon;
  }

  return {
    lat,
    lon,
  };
};

const Locality = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '50%' }} />
      <col span="2" style={{ width: '30%' }} />
    </colgroup>
    <tbody>
      <tr>
        <td colSpan="3">
          <strong>
            World Geographical Scheme for
            {' '}
            Recording Plant Distributions (Brummitt 2001)
          </strong>
        </td>
      </tr>
      <TableRow
        className="left-padding"
        label="- Level 1:"
        value={data['world-l4']
          ? data['world-l4']['world-l3']['world-l2']['world-l1'].description
          : ''}
      />
      <TableRow
        label="- Level 2:"
        value={data['world-l4']
          ? data['world-l4']['world-l3']['world-l2'].description
          : ''}
      />
      <TableRow
        label="- Level 3:"
        value={data['world-l4']
          ? data['world-l4']['world-l3'].description
          : ''}
      />
      <TableRow
        label="- Level 4:"
        value={data['world-l4']
          ? data['world-l4'].description
          : ''}
      />
      <TableRow
        label="Closest city/town/village/settlement:"
        value={data.closestVillageTown}
      />
      <TableRow
        label="Description of the locality:"
        value={data.description}
      />
      <TableRow
        label="Exposition:"
        value={data.exposition}
      />
      <TableRow
        label="Altitude:"
        value={data.altitude}
      />
      <CTableRowCoordinates
        label="Published geographical coordinates:"
        lat={data.coordinatesLat}
        lon={data.coordinatesLon}
      />
      <CTableRowCoordinates
        label="Estimated geographical coordinates:"
        lat={getGeoreferencedCoordinates(data).lat}
        lon={getGeoreferencedCoordinates(data).lon}
      />
      <TableRow
        label="Central european mapping unit:"
        value={data.centralEuropeanMappingUnit}
      />
      <TableRow
        label="Geographical district:"
        value={data.geographicalDistrict}
      />
      <TableRow
        label="Phytogeographical district:"
        value={data.phytogeographicalDistrict}
      />
      <TableRow
        label="Administrative unit:"
        value={data.administrativeUnit}
      />
    </tbody>
  </Table>
);

export default Locality;

Locality.propTypes = {
  data: PropTypes.shape({
    closestVillageTown: PropTypes.string,
    description: PropTypes.string,
    exposition: PropTypes.string,
    altitude: PropTypes.string,
    coordinatesLat: PropTypes.string,
    coordinatesLon: PropTypes.string,
    coordinatesGeoref: PropTypes.shape({
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
      }).isRequired,
    }),
    centralEuropeanMappingUnit: PropTypes.string,
    geographicalDistrict: PropTypes.string,
    phytogeographicalDistrict: PropTypes.string,
    administrativeUnit: PropTypes.string,
    'world-l4': PropTypes.shape({
      description: PropTypes.string.isRequired,
      'world-l3': PropTypes.shape({
        description: PropTypes.string.isRequired,
        'world-l2': PropTypes.shape({
          description: PropTypes.string.isRequired,
          'world-l1': PropTypes.shape({
            description: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }).isRequired,
};
