import React from 'react';
import { Col, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LabelValue from '../LabelValue';

const PUBLICATION_MISSING = 'Not provided';
const PUBLICATION_LABEL = 'Published in:';

const Publication = ({ publication }) => (
  <div id="publication">
    <Row className="dblock">
      <Col xs={12}>
        <LabelValue
          label={PUBLICATION_LABEL}
          value={publication || PUBLICATION_MISSING}
        />
      </Col>
    </Row>
  </div>
);

export default Publication;

Publication.propTypes = {
  publication: PropTypes.string,
};

Publication.defaultProps = {
  publication: undefined,
};
