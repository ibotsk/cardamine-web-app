import React from 'react';
import { Col, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LabelValue from '../../segments/LabelValue';
import LosName from '../../segments/LosName';
import SpeciesType from '../../propTypes/species';

import { utils } from '../../../utils';
import config from '../../../config';

const NameBlock = ({ id, data, label }) => {
  if (utils.isEmptyObj(data)) {
    return null;
  }
  return (
    <div id={id}>
      <Row className="dblock">
        <Col xs={12}>
          <LabelValue
            label={label}
            value={(
              <LosName
                data={data}
                isPublication
                uri={`${config.routes.checklist}/${data.id}`}
              />
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NameBlock;

NameBlock.propTypes = {
  id: PropTypes.string.isRequired,
  data: SpeciesType.type,
  label: PropTypes.string.isRequired,
};

NameBlock.defaultProps = {
  data: {},
};
