import axios from 'axios';

import common from './common';
import config from '../config';

const { getById } = common;
const { uris } = config;

async function searchChecklist(searchFields, rowsPerPage, page) {
  const uri = uris.checklist.searchChecklistUri;
  const request = {
    ...searchFields,
    page,
    rowsPerPage,
  };
  const result = await axios.post(uri, request);
  return result.data;
}

async function getSpeciesById(id) {
  return getById(id, uris.checklist.getSpeciesByIdUri);
}

async function getSynonymsOfId(id) {
  return getById(id, uris.checklist.getSynonymsOfIdUri);
}

async function getInvalidDesignationsOf(id) {
  return getById(id, uris.checklist.getInvalidSynonymsUri);
}

async function getMisidentificationsOf(id) {
  return getById(id, uris.checklist.getMisidentificationsUri);
}

async function getForRelations(id) {
  return getById(id, uris.checklist.getForRelationsUri);
}

export default {
  searchChecklist,
  getSpeciesById,
  getSynonymsOfId,
  getInvalidDesignationsOf,
  getMisidentificationsOf,
  getForRelations,
};
