import React from 'react';

const MISSING_VALUE = '-';

const LabelValue = ({ label, value }) => (
  <>
    <span className="dlabel">{label}</span>
    <span>{value || MISSING_VALUE}</span>
  </>
);

export default LabelValue;
