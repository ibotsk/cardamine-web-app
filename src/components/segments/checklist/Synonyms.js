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
  isSublist = false,
}) => (
  <ul>
    {
      list.map((s) => {
        const name = (isSublist ? s : s.name) || {};
        const sublist = sublistProp ? name[sublistProp] : null;
        return (
          <li key={s.id} className={className}>
            <span>
              <LosName
                data={name}
                format="italic"
                isPublication
                uri={`${config.routes.checklist}/${name.id}`}
              />
              {
                sublist && sublist.length > 0
                && (
                  <SynList
                    list={sublist}
                    className={`${sublistClass} checklist-subinfo`}
                    isSublist
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
            sublistProp="subsynonymsNomenclatoric"
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
  isSublist: PropTypes.bool,
};

SynList.defaultProps = {
  sublistProp: undefined,
  sublistClass: undefined,
  additions: undefined,
  isSublist: false,
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
