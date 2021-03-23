import React from 'react';
import { Grid } from 'react-bootstrap';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChecklistFilter from '../../segments/filter/ChecklistFilter';
import LosName from '../../segments/checklist/LosName';

import SpeciesPropType from '../../propTypes/species';

import { checklist as checklistFacade } from '../../../facades';

import {
  utils as otherUtils,
} from '../../../utils';

import config from '../../../config';

import RemotePagination from '../../segments/RemotePagination';

const {
  mappings: { losType: losTypeConfig },
} = config;

const SynonymOf = ({ accepted }) => {
  if (!accepted) {
    return null;
  }
  return (
    <>
      {' '}
      of
      {' '}
      <LosName
        data={accepted}
        format="italic"
        isPublication
        uri={otherUtils.getSpeciesDetailUri(accepted.id)}
      />
    </>
  );
};

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'Name',
    headerClasses: 'warning',
    headerStyle: { width: '50%' },
    formatter: (cell, row) => (
      <LosName
        data={row}
        format="italic"
        uri={otherUtils.getSpeciesDetailUri(row.id)}
      />
    ),
  },
  {
    dataField: 'price',
    text: 'Status',
    headerClasses: 'warning',
    headerStyle: { width: '50%' },
    formatter: (cell, row) => (
      <>
        <span
          style={{ color: losTypeConfig[row.ntype].colour }}
        >
          {losTypeConfig[row.ntype].text}
        </span>
        <SynonymOf accepted={row.accepted} />
      </>
    ),
  },
];

class Checklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizePerPage: 20,
      page: 1,
      totalSize: 0,
      results: [],
      searchValues: {},
      filterOpen: true,
      searchClicked: false,
    };
  }

  /**
   * Gets data based on the values from filter.
   * Sets paginator to page 1
   */
  handleFilter = async (params) => {
    const {
      genus, species, infraspecific, authors, typesSelected,
    } = params;

    const { sizePerPage, page } = this.state;

    const {
      data: results,
      totalRecords: totalSize,
    } = await checklistFacade.searchChecklist(
      genus, species, infraspecific, authors, typesSelected, sizePerPage, page,
    );

    this.setState({
      results,
      totalSize,
      searchValues: params,
      filterOpen: false,
      searchClicked: true,
    });
  };

  handleTableChange = async (type, { page, sizePerPage }) => {
    const { searchValues } = this.state;

    const {
      genus, species, infraspecific, authors, typesSelected,
    } = searchValues;
    const { data: results } = await checklistFacade.searchChecklist(
      genus, species, infraspecific, authors, typesSelected,
      sizePerPage, page,
    );

    this.setState({
      results,
      page,
      sizePerPage,
    });
  }

  handleToggleFilter = () => this.setState(({ filterOpen }) => ({
    filterOpen: !filterOpen,
  }));

  render() {
    const {
      results, sizePerPage, page, totalSize, filterOpen,
      searchClicked,
    } = this.state;

    return (
      <div>
        <Grid>
          <FilterToggleWrapper
            id="filter-checklist"
            open={filterOpen}
            onToggle={this.handleToggleFilter}
          >
            <ChecklistFilter onFilter={this.handleFilter} />
          </FilterToggleWrapper>
          {searchClicked && results.length === 0 && (
            <h4>No results found</h4>
          )}
          {results.length > 0 && (
            <RemotePagination
              id="results-checklist"
              keyField="id"
              columns={columns}
              data={results}
              page={page}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={this.handleTableChange}
            />
          )}
        </Grid>
      </div>
    );
  }
}

export default Checklist;

SynonymOf.propTypes = {
  accepted: SpeciesPropType.type,
};

SynonymOf.defaultProps = {
  accepted: undefined,
};
