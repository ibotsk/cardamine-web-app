import React from 'react';

import PropTypes from 'prop-types';
import PublicationType from '../../../propTypes/publication';

import RemotePagination from '../../../segments/RemotePagination';

import { helper, formatter } from '../../../../utils';

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'chromInfo',
    text: 'Chromosomes info',
    headerStyle: { width: '15%' },
    formatter: ({ n, dn, chCount }) => (
      formatter.chromosomes(dn, n, chCount)
    ),
  },
  {
    dataField: 'ploidyOrDNAInfo',
    text: 'Ploidy level and/or DNA content',
    headerStyle: { width: '15%' },
    formatter: ({
      sizeC, sizeFrom, sizeTo, sizeUnits, ploidy, ploidyRevised,
    }) => {
      const pl = [ploidyRevised, ploidy].find((e) => !!e);
      const dna = formatter.genomeSize(sizeC, sizeFrom, sizeTo, sizeUnits);

      return [pl, dna].filter((e) => !!e).join(', ');
    },
  },
  {
    dataField: 'publication',
    text: 'Published in',
    headerStyle: { width: '70%' },
    formatter: (cell) => (
      cell ? helper.parsePublication(cell) : 'N/A'
    ),
  },
];

const formatData = ({
  id, literature, n, dn,
  dna: {
    chCount,
    sizeC,
    sizeFrom,
    sizeTo,
    sizeUnits,
    ploidy,
    ploidyRevised,
  } = {},
}) => ({
  id,
  chromInfo: { n, dn, chCount },
  ploidyOrDNAInfo: {
    sizeC, sizeFrom, sizeTo, sizeUnits, ploidy, ploidyRevised,
  },
  publication: literature,
});

const ChromosomeRecodsList = ({
  data,
  page,
  sizePerPage,
  totalSize,
  onTableChange,
}) => {
  const formattedData = data.map(formatData);

  return (
    <RemotePagination
      id="results-chromosome-records"
      keyField="id"
      columns={columns}
      data={formattedData}
      page={page}
      sizePerPage={sizePerPage}
      totalSize={totalSize}
      onTableChange={onTableChange}
    />
  );
};

export default ChromosomeRecodsList;

ChromosomeRecodsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    n: PropTypes.string,
    dn: PropTypes.string,
    dna: PropTypes.shape({
      chCount: PropTypes.string,
      sizeC: PropTypes.string,
      sizeFrom: PropTypes.string,
      sizeTo: PropTypes.string,
      sizeUnits: PropTypes.string,
      ploidy: PropTypes.string,
      ploidyRevised: PropTypes.string,
    }),
    literature: PublicationType.type,
  })).isRequired,
  page: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};
