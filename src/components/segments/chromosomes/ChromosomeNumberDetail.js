import React from 'react';

import PropTypes from 'prop-types';

import { Glyphicon, Table } from 'react-bootstrap';

import CTableRow from './CTableRow';

import { formatter } from '../../../utils';

const TrueFalse = ({ value }) => (
  <Glyphicon glyph={value ? 'ok' : 'remove'} />
);

const ChromosomeNumberDetail = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '50%' }} />
      <col span="1" style={{ width: '30%' }} />
    </colgroup>
    <tbody>
      <CTableRow
        label="Chromosome count:"
        value={formatter.chromosomes(data.dn, data.n)}
      />
      <CTableRow
        label="Ploidy as published in original source:"
        value={data.ploidyLevel}
      />
      <CTableRow
        label="Ploidy after last revision:"
        value={data.ploidyLevelRevised}
      />
      <CTableRow
        label="Base chromosome number (x) after last revision:"
        value={data.xRevised}
      />
      <CTableRow
        label="Counted by:"
        value={data['counted-by'] ? data['counted-by'].persName : undefined}
      />
      <CTableRow
        label="Date:"
        value={data.countedDate}
      />
      <CTableRow
        label="Number of analyzed plants:"
        value={data.numberOfAnalysedPlants}
      />
      <CTableRow
        label="Slide number:"
        value={data.slideNo}
      />
      <CTableRow
        label="Deposited in:"
        value={data.depositedIn}
      />
      <CTableRow
        label="Karyotype:"
        value={data.karyotype}
      />
      <CTableRow
        label="Photo:"
        value={<TrueFalse value={data.photo} />}
      />
      <CTableRow
        label="Idiogram:"
        value={<TrueFalse value={data.idiogram} />}
      />
      <CTableRow
        label="Drawing:"
        value={<TrueFalse value={data.drawing} />}
      />
      <CTableRow
        label="Note:"
        value={data.publicNote}
      />
    </tbody>
  </Table>
);

export default ChromosomeNumberDetail;

ChromosomeNumberDetail.propTypes = {
  data: PropTypes.shape({
    n: PropTypes.string,
    dn: PropTypes.string,
    x: PropTypes.string,
    countedDate: PropTypes.string,
    drawing: PropTypes.bool,
    photo: PropTypes.bool,
    idiogram: PropTypes.bool,
    karyotype: PropTypes.string,
    ploidyLevel: PropTypes.string,
    numberOfAnalysedPlants: PropTypes.number,
    slideNo: PropTypes.string,
    depositedIn: PropTypes.string,
    ploidyLevelRevised: PropTypes.string,
    publicNote: PropTypes.string,
    xRevised: PropTypes.string,
    'counted-by': PropTypes.shape({
      persName: PropTypes.string,
    }),
  }).isRequired,
};

TrueFalse.propTypes = {
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

TrueFalse.defaultProps = {
  value: undefined,
};
