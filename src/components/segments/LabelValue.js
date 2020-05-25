import React from 'react';

import PropTypes from 'prop-types';

const MISSING_VALUE = '-';

const LabelValue = ({ label, value }) => (
  <>
    <span className="dlabel">{label}</span>
    <span>{value || MISSING_VALUE}</span>
  </>
);

export default LabelValue;

LabelValue.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

LabelValue.defaultProps = {
  label: undefined,
  value: undefined,
};
