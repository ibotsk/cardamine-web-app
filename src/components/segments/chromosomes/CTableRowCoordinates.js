import React from 'react';

import PropTypes from 'prop-types';

import TableRow from '../TableRow';

const CTableRowCoordinates = ({ label, lat, lon }) => (
  <TableRow
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
  </TableRow>
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
