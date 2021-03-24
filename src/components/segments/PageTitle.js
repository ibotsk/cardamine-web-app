import React from 'react';
import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';

import config from '../../config';

const { websiteTitle } = config;

const PageTitle = ({ title }) => (
  <Helmet>
    <title>{[websiteTitle, title].filter((e) => !!e).join(' - ')}</title>
  </Helmet>
);

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
