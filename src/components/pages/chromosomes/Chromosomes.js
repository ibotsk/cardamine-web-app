import React from 'react';
import { Grid } from 'react-bootstrap';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChromosomesFilter from '../../segments/filter/ChromosomesFilter';

const Chromosomes = () => (
  <Grid>
    <FilterToggleWrapper id="filter-checklist">
      <ChromosomesFilter onFilter={(values) => console.log(values)} />
    </FilterToggleWrapper>
  </Grid>
);

export default Chromosomes;
