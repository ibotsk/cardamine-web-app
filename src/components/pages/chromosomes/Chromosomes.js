import React from 'react';
import { Grid } from 'react-bootstrap';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChromosomesFilter from '../../segments/filter/ChromosomesFilter';

import { cdataSearch as searchFacade } from '../../../facades';
import { where as whereUtils } from '../../../utils';

class Chromosomes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      totalSize: 0,
    };
  }

  handleFilter = async (params) => {
    const {
      nameSearchType,
      ...searchParams
    } = params;
    console.log(searchParams);

    const where = whereUtils.makeCdataSearchWhere(nameSearchType, searchParams);
    console.log(where);
    const results = await searchFacade.getAll(where);

    this.setState({
      results,
    });
  }

  render() {
    console.log(this.state);

    const { results } = this.state;
    return (
      <div>
        <Grid>
          <FilterToggleWrapper id="filter-checklist">
            <ChromosomesFilter onFilter={this.handleFilter} />
          </FilterToggleWrapper>
        </Grid>
      </div>
    );
  }
}

export default Chromosomes;
