import React from 'react';
import { Col, Row } from 'react-bootstrap';

import LosName from './LosName';

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
        const sublist = sublistProp ? s[sublistProp] : null;
        return (
          <li key={s.id} className={className}>
            <span>
              <LosName
                data={s}
                format="italic"
                isPublication
                uri={`${config.routes.checklist}/${s.id}`}
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
  id, label, nomenclatoric, taxonomic, invalidDesignations, isLabel = true,
}) => (
  <div id={id} className="dblock">
    <div>
      {
        isLabel
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
