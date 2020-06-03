import React from 'react';

import PropTypes from 'prop-types';

import CTableRow from './CTableRow';

const CTableRowCoordinates = ({ label, lat, lon }) => (
  <CTableRow
    label={label}
  >
    <td>
      <strong>Lat:</strong>
      {' '}
      {lat || '-'}
    </td>
    <td>
      <strong>Lon:</strong>
      {' '}
      {lon || '-'}
    </td>
  </CTableRow>
);

export default CTableRowCoordinates;

CTableRowCoordinates.propTypes = {
  label: PropTypes.string.isRequired,
  lat: PropTypes.string,
  lon: PropTypes.string,
};

CTableRowCoordinates.defaultProps = {
  lat: undefined,
  lon: undefined,
};
