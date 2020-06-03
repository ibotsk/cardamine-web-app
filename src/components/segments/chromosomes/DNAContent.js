import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import CTableRow from './CTableRow';

import { formatter } from '../../../utils';

const DNAContent = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '50%' }} />
      <col span="1" style={{ width: '30%' }} />
    </colgroup>
    <tbody>
      <CTableRow
        label="Method:"
        value={data.method}
      />
      <CTableRow
        label="DNA ploidy level as published in the original source:"
        value={data.ploidy}
      />
      <CTableRow
        label="DNA ploidy level after last revision:"
        value={data.ploidyRevised}
      />
      <CTableRow
        label="Chromosome count:"
        value={formatter.chromosomes(data.chCount, undefined, undefined, '≈')}
      />
      <CTableRow
        label="Genome size:"
        value={formatter.genomeSize(
          data.sizeC,
          data.sizeFrom,
          data.sizeTo,
          data.sizeUnits,
        )}
      />
      <CTableRow
        label="Number of analysed plants:"
        value={data.plantsAnalysed}
      />
      <CTableRow
        label="Number of analyses:"
        value={data.numberAnalyses}
      />
      <CTableRow
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
    numberAnalyses: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
};
