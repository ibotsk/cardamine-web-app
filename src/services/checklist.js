import axios from 'axios';
import template from 'url-template';

import common from './common';
import config from '../config';

const { getById } = common;
const { uris } = config;

async function getAll(where = {}, offset = 0, limit = 25) {
  const parsedUri = template
    .parse(uris.checklist.getAllWFilter)
    .expand({
      where: JSON.stringify(where),
      offset,
      limit,
    });
  const result = await axios.get(parsedUri);
  return result.data;
}

async function getCount(where = {}) {
  const parsedUri = template
    .parse(uris.checklist.getCount)
    .expand({
      where: JSON.stringify(where),
    });
  const result = await axios.get(parsedUri);
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
  getAll,
  getCount,
  getSpeciesById,
  getSynonymsOfId,
  getInvalidDesignationsOf,
  getMisidentificationsOf,
  getForRelations,
};
