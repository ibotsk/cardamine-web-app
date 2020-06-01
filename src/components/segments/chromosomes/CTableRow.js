import React from 'react';

import PropTypes from 'prop-types';

const DEFAULT = '-';

const CTableRow = ({ label, value = DEFAULT }) => (
  <tr>
    <td><strong>{label}</strong></td>
    <td colSpan="2">{value || DEFAULT}</td>
  </tr>
);

export default CTableRow;

CTableRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

CTableRow.defaultProps = {
  value: DEFAULT,
};
