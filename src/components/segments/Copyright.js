import React from 'react';

import { Link } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

const Copyright = () => (
  <Grid id="footer" className="text-center">
    <div>
      {'Copyright © '}
      <Link to="/">
        https://cardamine.sav.sk
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </div>
    <div>
      v0.9
    </div>
  </Grid>
);

export default Copyright;
