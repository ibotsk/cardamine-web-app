import React from 'react';

import PropTypes from 'prop-types';

const DEFAULT = '-';

const TableRow = ({
  label, value = DEFAULT, children,
}) => (
  <tr>
    <td><strong>{label}</strong></td>
    {
      !children
      && <td colSpan="2">{value || DEFAULT}</td>
    }
    {children}
  </tr>
);

export default TableRow;

TableRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

TableRow.defaultProps = {
  value: DEFAULT,
  children: undefined,
};
