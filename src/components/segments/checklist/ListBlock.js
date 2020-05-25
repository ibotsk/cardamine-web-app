import React from 'react';
import { Col, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LabelValue from '../LabelValue';
import LosName from './LosName';
import SpeciesType from '../../propTypes/species';

import config from '../../../config';

const NameList = ({ list }) => (
  <ul>
    {
      list.map((s) => (
        <li key={s.id}>
          <LosName
            data={s}
            format="italic"
            isPublication
            uri={`${config.routes.checklist}/${s.id}`}
          />
        </li>
      ))
    }
  </ul>
);

const ListBlock = ({ id, data, label }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div id={id}>
      <Row className="dblock">
        <Col xs={12}>
          <LabelValue label={label} value={<NameList list={data} />} />
        </Col>
      </Row>
    </div>
  );
};

export default ListBlock;

NameList.propTypes = {
  list: PropTypes.arrayOf(SpeciesType.type).isRequired,
};

ListBlock.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(SpeciesType.type).isRequired,
};
