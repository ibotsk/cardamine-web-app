import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import CTableRow from './CTableRow';
import CTableRowCoordinates from './CTableRowCoordinates';

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
      <CTableRow
        className="left-padding"
        label="- Level 1:"
        value={data['world-l4']
          ? data['world-l4']['world-l3']['world-l2']['world-l1'].description
          : ''}
      />
      <CTableRow
        label="- Level 2:"
        value={data['world-l4']
          ? data['world-l4']['world-l3']['world-l2'].description
          : ''}
      />
      <CTableRow
        label="- Level 3:"
        value={data['world-l4']
          ? data['world-l4']['world-l3'].description
          : ''}
      />
      <CTableRow
        label="- Level 4:"
        value={data['world-l4']
          ? data['world-l4'].description
          : ''}
      />
      <CTableRow
        label="Closest city/town/village/settlement:"
        value={data.closestVillageTown}
      />
      <CTableRow
        label="Description of the locality:"
        value={data.description}
      />
      <CTableRow
        label="Exposition:"
        value={data.exposition}
      />
      <CTableRow
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
        lat={data.coordinatesGeorefLat}
        lon={data.coordinatesGeorefLon}
      />
      <CTableRow
        label="Central european mapping unit:"
        value={data.centralEuropeanMappingUnit}
      />
      <CTableRow
        label="Geographical district:"
        value={data.geographicalDistrict}
      />
      <CTableRow
        label="Phytogeographical district:"
        value={data.phytogeographicalDistrict}
      />
      <CTableRow
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
    coordinatesGeorefLat: PropTypes.string,
    coordinatesGeorefLon: PropTypes.string,
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
