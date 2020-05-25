import React from 'react';
import { Grid } from 'react-bootstrap';

import FilterToggleWrapper from '../../segments/filter/FilterToggleWrapper';
import ChecklistFilter from '../../segments/filter/ChecklistFilter';

const Checklist = () => (
  <div>
    <Grid>
      <FilterToggleWrapper id="filter-checklist">
        <ChecklistFilter />
      </FilterToggleWrapper>
    </Grid>
  </div>
);

export default Checklist;
