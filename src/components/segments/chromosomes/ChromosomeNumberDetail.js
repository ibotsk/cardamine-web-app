import React from 'react';

import PropTypes from 'prop-types';

import { Glyphicon, Table } from 'react-bootstrap';

import TableRow from '../TableRow';

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
      <TableRow
        label="Chromosome count:"
        value={formatter.chromosomes(data.dn, data.n)}
      />
      <TableRow
        label="Ploidy as published in original source:"
        value={data.ploidyLevel}
      />
      <TableRow
        label="Ploidy after last revision:"
        value={data.ploidyLevelRevised}
      />
      <TableRow
        label="Base chromosome number (x) after last revision:"
        value={data.xRevised}
      />
      <TableRow
        label="Counted by:"
        value={data.countedBy ? data.countedBy.persName : undefined}
      />
      <TableRow
        label="Date:"
        value={data.countedDate}
      />
      <TableRow
        label="Number of analyzed plants:"
        value={data.numberOfAnalysedPlants}
      />
      <TableRow
        label="Slide number:"
        value={data.slideNo}
      />
      <TableRow
        label="Deposited in:"
        value={data.depositedIn}
      />
      <TableRow
        label="Karyotype:"
        value={data.karyotype}
      />
      <TableRow
        label="Photo:"
        value={<TrueFalse value={data.photo} />}
      />
      <TableRow
        label="Idiogram:"
        value={<TrueFalse value={data.idiogram} />}
      />
      <TableRow
        label="Drawing:"
        value={<TrueFalse value={data.drawing} />}
      />
      <TableRow
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
    countedBy: PropTypes.shape({
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
