import React from 'react';
import { Col, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LabelValue from '../LabelValue';
import LosName from './LosName';
import SpeciesType from '../../propTypes/species';

import { utils } from '../../../utils';

const NameBlock = ({
  id, data, label, isPublication = false, format, uri, defaultValue,
}) => {
  if (defaultValue === undefined && utils.isEmptyObj(data)) {
    return null;
  }
  let value = defaultValue;
  if (!utils.isEmptyObj(data)) {
    value = (
      <LosName
        data={data}
        isPublication={isPublication}
        format={format}
        uri={uri}
      />
    );
  }

  return (
    <div id={id}>
      <Row className="dblock">
        <Col xs={12}>
          <LabelValue
            label={label}
            value={value}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NameBlock;

NameBlock.propTypes = {
  id: PropTypes.string,
  data: SpeciesType.type,
  label: PropTypes.string.isRequired,
  isPublication: PropTypes.bool,
  format: PropTypes.string,
  uri: PropTypes.string,
  defaultValue: PropTypes.string,
};

NameBlock.defaultProps = {
  id: undefined,
  data: {},
  isPublication: false,
  format: undefined,
  uri: undefined,
  defaultValue: undefined,
};
