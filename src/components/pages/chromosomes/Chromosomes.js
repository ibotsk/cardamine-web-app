import React from 'react';
import { Grid, Button } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChromosomesFilter from '../../segments/filter/ChromosomesFilter';
import LosName from '../../segments/checklist/LosName';

import ChromosomeDataModal from './modals/ChromosomeDataModal';

import { cdataSearch as searchFacade } from '../../../facades';
import { where as whereUtils, helper } from '../../../utils';

const columns = (action) => [
  {
    dataField: 'key',
    text: 'key',
    hidden: true,
  },
  {
    dataField: 'latestRevision',
    text: 'Latest Identification',
    headerClasses: 'warning',
    headerStyle: { width: '25%' },
    formatter: (cell) => (
      <LosName
        data={cell}
      />
    ),
  },
  {
    dataField: 'originalName',
    text: 'Original Name',
    headerClasses: 'warning',
    headerStyle: { width: '25%' },
    formatter: (cell) => (
      <LosName
        data={cell}
      />
    ),
  },
  {
    dataField: 'acceptedName',
    text: 'Accepted Name',
    headerClasses: 'warning',
    headerStyle: { width: '25%' },
    formatter: (cell) => (
      <LosName
        data={cell}
      />
    ),
  },
  {
    dataField: 'count',
    text: 'Records',
    headerClasses: 'warning',
    headerStyle: { width: '10%' },
  },
  {
    dataField: 'viewRecords',
    text: '',
    headerClasses: 'warning',
    formatter: (cell) => (
      <Button
        bsStyle="link"
        bsSize="xsmall"
        onClick={() => action(cell)}
      >
        View records
      </Button>
    ),
  },
];

class Chromosomes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      showModalRecords: false,
      cdataIds: [],
    };
  }

  handleFilter = async (params) => {
    const {
      nameSearchType,
      ...searchParams
    } = params;
    const where = whereUtils.makeCdataSearchWhere(nameSearchType, searchParams);

    const results = await searchFacade.getAllGrouped(where);

    this.setState({
      results,
    });
  }

  showModal = (cdataIds) => {
    this.setState({
      showModalRecords: true,
      cdataIds,
    });
  };

  hideModal = () => {
    this.setState({ showModalRecords: false });
  };

  render() {
    const { results, cdataIds, showModalRecords } = this.state;

    const data = results.map((r, i) => ({
      key: i,
      latestRevision: helper.getLosFromCdataSearchResult(r, 'latestRevision'),
      originalName: helper.getLosFromCdataSearchResult(r, 'original'),
      acceptedName: helper.getLosFromCdataSearchResult(r, 'accepted'),
      count: r.recordsCount,
      viewRecords: r.cdataIds,
    }));

    const cols = columns(this.showModal);

    return (
      <div>
        <Grid>
          <FilterToggleWrapper id="filter-checklist">
            <ChromosomesFilter onFilter={this.handleFilter} />
          </FilterToggleWrapper>
          <BootstrapTable
            responsive
            condensed
            striped
            hover
            keyField="key"
            data={data}
            columns={cols}
          />
        </Grid>
        <ChromosomeDataModal
          ids={cdataIds}
          show={showModalRecords}
          onHide={this.hideModal}
        />
      </div>
    );
  }
}

export default Chromosomes;
