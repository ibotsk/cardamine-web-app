import React from 'react';

import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

const Copyright = () => (
  <Grid id="footer" className="text-center">
    {'Copyright © '}
    <Link to="/">
      https://cardamine.sav.sk
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Grid>
);

export default Copyright;
