import React from 'react';
import { Col, Row } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LosName from './LosName';
import SynonymType from '../../propTypes/synonym';

import config from '../../../config';

const {
  nomenclatoric: nomenclatoricConfig,
  taxonomic: taxonomicConfig,
  invalid: invalidConfig,
} = config.mappings.synonym;

const renderInvalidDesignations = (invalidDesignations) => {
  if (invalidDesignations && invalidDesignations.length > 0) {
    return (
      <div>
        <b>Designations not validly published:</b>
        <Row>
          <Col xs={12}>
            <SynList
              list={invalidDesignations}
              className={invalidConfig.className}
            />
          </Col>
        </Row>
      </div>
    );
  }
  return null;
};

const SynList = ({
  list, className, sublistProp, sublistClass,
}) => (
  <ul>
    {
      list.map((s) => {
        const { synonym } = s;
        const sublist = sublistProp ? synonym[sublistProp] : null;
        return (
          <li key={s.id} className={className}>
            <span>
              <LosName
                data={synonym}
                format="italic"
                isPublication
                uri={`${config.routes.checklist}/${synonym.id}`}
              />
              {
                sublist && sublist.length > 0
                && <SynList list={sublist} className={sublistClass} />
              }
            </span>
          </li>
        );
      })
    }
  </ul>
);

const Synonyms = ({
  id, label, nomenclatoric, taxonomic, invalidDesignations,
}) => (
  <div id={id} className="dblock">
    <div>
      {
        label
        && <b>{label}</b>
      }
      <Row>
        <Col xs={12}>
          {
            nomenclatoric && nomenclatoric.length > 0
            && (
              <SynList
                list={nomenclatoric}
                className={nomenclatoricConfig.className}
              />
            )
          }
          {
            taxonomic && taxonomic.length > 0
            && (
              <SynList
                list={taxonomic}
                className={taxonomicConfig.className}
                sublistProp="synonyms-nomenclatoric"
                sublistClass={nomenclatoricConfig.className}
              />
            )
          }
        </Col>
      </Row>
      {
        renderInvalidDesignations(invalidDesignations)
      }
    </div>
  </div>
);

export default Synonyms;

SynList.propTypes = {
  list: PropTypes.arrayOf(SynonymType.type).isRequired,
  className: PropTypes.string.isRequired,
  sublistProp: PropTypes.string,
  sublistClass: PropTypes.string,
};

SynList.defaultProps = {
  sublistProp: undefined,
  sublistClass: undefined,
};

Synonyms.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  nomenclatoric: PropTypes.arrayOf(SynonymType.type).isRequired,
  taxonomic: PropTypes.arrayOf(SynonymType.type).isRequired,
  invalidDesignations: PropTypes.arrayOf(SynonymType.type).isRequired,
};

Synonyms.defaultProps = {
  id: undefined,
  label: undefined,
};
