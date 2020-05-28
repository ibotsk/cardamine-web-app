import React from 'react';
import { Col, Row, Panel } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LosName from './LosName';
import SynonymType from '../../propTypes/synonym';

import config from '../../../config';

const {
  nomenclatoric: nomenclatoricConfig,
  taxonomic: taxonomicConfig,
  invalid: invalidConfig,
  misidentification: misidentificationConfig,
} = config.mappings.synonym;

const MisidentificationAuthor = ({ item }) => (
  <div className="checklist-subinfo">
    Misidentified by:
    {' '}
    {
      `${item.misidentificationAuthor || '-'}`
    }
  </div>
);

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

const renderMisidentifications = (misidentifications) => {
  if (misidentifications && misidentifications.length > 0) {
    return (
      <div>
        <b>Misidentifications:</b>
        <Row>
          <Col xs={12}>
            <SynList
              list={misidentifications}
              className={misidentificationConfig.className}
              additions={MisidentificationAuthor}
            />
          </Col>
        </Row>
      </div>
    );
  }
  return null;
};

const SynList = ({
  list, className, sublistProp, sublistClass, additions: Additions,
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
                && (
                  <SynList
                    list={sublist}
                    className={`${sublistClass} checklist-subinfo`}
                  />
                )
              }
              {
                Additions && <Additions item={s} />
              }
            </span>
          </li>
        );
      })
    }
  </ul>
);

const Synonyms = ({
  id, label, nomenclatoric, taxonomic, invalidDesignations, misidentifications,
}) => (
  <Panel id={id}>
    <Panel.Body>
      <span className="dlabel">{label}</span>
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
      {
        renderInvalidDesignations(invalidDesignations)
      }
      {
        renderMisidentifications(misidentifications)
      }
    </Panel.Body>
  </Panel>
);

export default Synonyms;

MisidentificationAuthor.propTypes = {
  item: PropTypes.shape({
    misidentificationAuthor: PropTypes.string,
  }).isRequired,
};

SynList.propTypes = {
  list: PropTypes.arrayOf(SynonymType.type).isRequired,
  className: PropTypes.string.isRequired,
  sublistProp: PropTypes.string,
  sublistClass: PropTypes.string,
  additions: PropTypes.func,
};

SynList.defaultProps = {
  sublistProp: undefined,
  sublistClass: undefined,
  additions: undefined,
};

Synonyms.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  nomenclatoric: PropTypes.arrayOf(SynonymType.type).isRequired,
  taxonomic: PropTypes.arrayOf(SynonymType.type).isRequired,
  invalidDesignations: PropTypes.arrayOf(SynonymType.type).isRequired,
  misidentifications: PropTypes.arrayOf(SynonymType.type).isRequired,
};

Synonyms.defaultProps = {
  id: undefined,
};
