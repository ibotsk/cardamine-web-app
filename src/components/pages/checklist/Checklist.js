import React from 'react';
import { Grid } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChecklistFilter from '../../segments/filter/ChecklistFilter';
import LosName from '../../segments/checklist/LosName';

import SpeciesPropType from '../../propTypes/species';

import facades from '../../../facades';

import { where as whereUtils } from '../../../utils';
import config from '../../../config';

const { checklist: checklistFacade } = facades;
const { mappings: { losType: losTypeConfig }, routes } = config;

const nameUri = (id) => `${routes.checklist}/${id}`;

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
        uri={nameUri(accepted.id)}
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
        uri={nameUri(row.id)}
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

SynonymOf.propTypes = {
  accepted: SpeciesPropType.type,
};

SynonymOf.defaultProps = {
  accepted: undefined,
};
