import React from 'react';

import { Col, Row, Panel } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LabelValue from '../LabelValue';

const Block = ({ label, value }) => (
  <Row className="dblock">
    <Col xs={12}>
      <LabelValue
        label={label}
        value={value}
      />
    </Col>
  </Row>
);

const Typification = ({ id, species }) => {
  const {
    typification, typeLocality,
    referenceToTypeDesignation, indLoc,
  } = species;
  const typeString = typification ? typification.toUpperCase() : typification;

  return (
    <Panel id={id}>
      <Panel.Body>
        <h4>Typification</h4>
        <Block label="Type:" value={typeString} />
        {
          typification && (
            <>
              <Block
                label="Type specimen / Illustration:"
                value={typeLocality}
              />
              <Block
                label="Reference to the type designation"
                value={referenceToTypeDesignation}
              />
              <Block
                label="Ind. loc. (from the protologue)"
                value={indLoc}
              />
            </>
          )
        }
      </Panel.Body>
    </Panel>
  );
};

export default Typification;

Typification.propTypes = {
  id: PropTypes.string,
  species: PropTypes.shape({
    typification: PropTypes.string,
    typeLocality: PropTypes.string,
    referenceToTypeDesignation: PropTypes.string,
    indLoc: PropTypes.string,
  }).isRequired,
};

Typification.defaultProps = {
  id: undefined,
};

Block.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Block.defaultProps = {
  value: undefined,
};
