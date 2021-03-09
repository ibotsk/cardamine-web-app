import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import TableRow from '../TableRow';

import { formatter } from '../../../utils';

const DNAContent = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '50%' }} />
      <col span="1" style={{ width: '30%' }} />
    </colgroup>
    <tbody>
      <TableRow
        label="Method:"
        value={data.method}
      />
      <TableRow
        label="DNA ploidy level as published in the original source:"
        value={data.ploidy}
      />
      <TableRow
        label="DNA ploidy level after last revision:"
        value={data.ploidyRevised}
      />
      <TableRow
        label="Chromosome count:"
        value={formatter.chromosomes(data.chCount, undefined, undefined, '≈')}
      />
      <TableRow
        label="Genome size:"
        value={formatter.genomeSize(
          data.sizeC,
          data.sizeFrom,
          data.sizeTo,
          data.sizeUnits,
        )}
      />
      <TableRow
        label="Number of analysed plants:"
        value={data.plantsAnalysed}
      />
      <TableRow
        label="Number of analyses:"
        value={data.numberOfAnalyses}
      />
      <TableRow
        label="Note:"
        value={data.note}
      />
    </tbody>
  </Table>
);

export default DNAContent;

DNAContent.propTypes = {
  data: PropTypes.shape({
    method: PropTypes.string,
    ploidy: PropTypes.string,
    ploidyRevised: PropTypes.string,
    chCount: PropTypes.string,
    sizeC: PropTypes.string,
    sizeFrom: PropTypes.string,
    sizeTo: PropTypes.string,
    sizeUnits: PropTypes.string,
    plantsAnalysed: PropTypes.string,
    numberOfAnalyses: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
};
