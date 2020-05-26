import React from 'react';
import { Grid } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChecklistFilter from '../../segments/filter/ChecklistFilter';
import LosName from '../../segments/checklist/LosName';

import facades from '../../../facades';

import { where as whereUtils } from '../../../utils';
import config from '../../../config';

const { checklist: checklistFacade } = facades;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'Name',
    formatter: (cell, row) => (
      <LosName
        data={row}
        format="italic"
        uri={`${config.routes.checklist}/${row.id}`}
      />
    ),
  },
  {
    dataField: 'price',
    text: 'Status',
    formatter: (cell, row) => row.ntype,
  },
];

class Checklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  handleFilter = async (params) => {
    const {
      genus, species, infraspecific, authors, typesSelected,
    } = params;
    const where = whereUtils.makeChecklistWhere(
      genus,
      species,
      infraspecific,
      authors,
      typesSelected,
    );

    const results = await checklistFacade.getAllSpecies(where);
    this.setState({ results });
  };

  render() {
    const { results } = this.state;

    return (
      <div>
        <Grid>
          <FilterToggleWrapper id="filter-checklist">
            <ChecklistFilter onFilter={this.handleFilter} />
          </FilterToggleWrapper>
          <BootstrapTable
            id="results-checklist"
            keyField="id"
            data={results}
            columns={columns}
          />
        </Grid>
      </div>
    );
  }
}

export default Checklist;
