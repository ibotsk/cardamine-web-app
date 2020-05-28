import React from 'react';

import PropTypes from 'prop-types';

import LabelValue from '../LabelValue';

const PUBLICATION_MISSING = 'Not provided';
const PUBLICATION_LABEL = 'Published in:';

const Publication = ({ publication }) => (
  <div>
    <LabelValue
      label={PUBLICATION_LABEL}
      value={publication || PUBLICATION_MISSING}
    />
  </div>
);

export default Publication;

Publication.propTypes = {
  publication: PropTypes.string,
};

Publication.defaultProps = {
  publication: undefined,
};
