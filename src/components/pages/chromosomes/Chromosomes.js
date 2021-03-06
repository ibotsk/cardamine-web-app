import React from 'react';
import { Grid } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChromosomesFilter from '../../segments/filter/ChromosomesFilter';
import LosName from '../../segments/checklist/LosName';

import ChromosomeDataModal from './modals/ChromosomeDataModal';

import { cdataSearch as searchFacade } from '../../../facades';
import { helper } from '../../../utils';
import PageTitle from '../../segments/PageTitle';

const columns = [
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
        format="italic"
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
        format="italic"
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
        format="italic"
      />
    ),
  },
  {
    dataField: 'count',
    text: 'Records',
    headerClasses: 'warning',
    headerStyle: { width: '10%' },
  },
];

const tableRowEvents = ({ handleClick }) => ({
  onClick: (e, row) => handleClick(row.cdataIds),
});

class Chromosomes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      showModalRecords: false,
      cdataIds: [],
      filterOpen: true,
      searchClicked: false,
    };
  }

  handleFilter = async (params) => {
    const {
      nameSearchType,
      ...searchParams
    } = params;

    const results = await searchFacade.getAllGrouped({
      ...searchParams,
      searchType: nameSearchType,
    });

    this.setState({
      results,
      filterOpen: false,
      searchClicked: true,
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

  handleToggleFilter = () => this.setState(({ filterOpen }) => ({
    filterOpen: !filterOpen,
  }));

  render() {
    const {
      results, cdataIds, showModalRecords, filterOpen, searchClicked,
    } = this.state;

    const data = results.map((r, i) => ({
      key: i,
      latestRevision: helper.getLosFromCdataSearchResult(r, 'latestRevision'),
      originalName: helper.getLosFromCdataSearchResult(r, 'original'),
      acceptedName: helper.getLosFromCdataSearchResult(r, 'accepted'),
      count: r.recordsCount,
      cdataIds: r.cdataIds,
    }));

    const rowEvents = tableRowEvents({ handleClick: this.showModal });

    return (
      <>
        <PageTitle title="Chromosomes" />
        <Grid>
          <FilterToggleWrapper
            id="filter-checklist"
            open={filterOpen}
            onToggle={this.handleToggleFilter}
          >
            <ChromosomesFilter onFilter={this.handleFilter} />
          </FilterToggleWrapper>
          {searchClicked && results.length === 0 && (
            <h4>No results found</h4>
          )}
          {results.length > 0 && (
            <BootstrapTable
              classes="clickable-row"
              hover
              condensed
              keyField="key"
              data={data}
              columns={columns}
              rowEvents={rowEvents}
            />
          )}
        </Grid>
        <ChromosomeDataModal
          ids={cdataIds}
          show={showModalRecords}
          onHide={this.hideModal}
        />
      </>
    );
  }
}

export default Chromosomes;
