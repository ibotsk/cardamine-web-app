import React from 'react';

import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import PublicationType from '../../../propTypes/publication';

import RemotePagination from '../../../segments/RemotePagination';

import { helper, formatter } from '../../../../utils';
import config from '../../../../config';

const { routes } = config;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'index',
    text: '',
    formatter: (cell) => (
      `${cell}.`
    ),
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

const tableRowEvents = ({ handleClick }) => ({
  onClick: (e, row) => handleClick(row.id),
});

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
}, index) => ({
  id,
  index,
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
  const index = (i) => (page - 1) * sizePerPage + i + 1;
  const formattedData = data.map((d, i) => formatData(d, index(i)));
  const history = useHistory();

  const rowEvents = tableRowEvents({
    handleClick: (id) => {
      history.push(routes.chromosomesDetail.replace(':id', id));
    },
  });

  return (
    <RemotePagination
      id="results-chromosome-records"
      tableClasses="clickable-row"
      keyField="id"
      hover
      columns={columns}
      data={formattedData}
      page={page}
      sizePerPage={sizePerPage}
      totalSize={totalSize}
      onTableChange={onTableChange}
      rowEvents={rowEvents}
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
