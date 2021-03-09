import axios from 'axios';
import template from 'url-template';

import config from '../config';

const { uris } = config;

async function getAllGrouped({
  n, dn, xRevised, ploidyLevelRevised, publicationAuthor, analysisAuthor,
  worldL1, worldL2, worldL3, worldL4, genus, species, infraspecific, searchType,
}) {
  const parsedUri = template.parse(uris.cdataSearch.searchCdataUri).expand();

  const request = {
    n,
    dn,
    xRevised,
    ploidyLevelRevised,
    publicationAuthor,
    analysisAuthor,
    worldL1,
    worldL2,
    worldL3,
    worldL4,
    genus,
    species,
    infraspecific,
    searchType,
  };

  const result = await axios.post(parsedUri, request);
  return result.data;
}

export default {
  getAllGrouped,
};
