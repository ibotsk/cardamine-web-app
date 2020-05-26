import axios from 'axios';
import template from 'url-template';

import config from '../config';

const { uris } = config;

const getById = async (id, uri) => {
  const parsedUri = template.parse(uri).expand({ id });
  const result = await axios.get(parsedUri);
  return result.data;
};

async function getAll(where = {}) {
  const parsedUri = template
    .parse(uris.checklist.getAllWFilter)
    .expand({ where: JSON.stringify(where) });
  const result = await axios.get(parsedUri);
  return result.data;
}

async function getSpeciesById(id) {
  return getById(id, uris.checklist.getSpeciesByIdUri);
}

async function getSynonymsNomenclatoricOf(id) {
  return getById(id, uris.checklist.getNomenclatoricSynonymsUri);
}

async function getSynonymsTaxonomicOf(id) {
  return getById(id, uris.checklist.getTaxonomicSynonymsUri);
}

async function getInvalidDesignationsOf(id) {
  return getById(id, uris.checklist.getInvalidSynonymsUri);
}

async function getMisidentificationsOf(id) {
  return getById(id, uris.checklist.getMisidentificationsUri);
}

async function getBasionymOf(id) {
  return getById(id, uris.checklist.getBasionymUri);
}

async function getAcceptedOf(id) {
  return getById(id, uris.checklist.getAcceptedNameUri);
}

async function getBasionymFor(id) {
  return getById(id, uris.checklist.getBasionymForUri);
}

async function getReplacedFor(id) {
  return getById(id, uris.checklist.getReplacedForUri);
}

async function getNomenNovumFor(id) {
  return getById(id, uris.checklist.getNomenNovumForUri);
}

export default {
  getAll,
  getSpeciesById,
  getSynonymsNomenclatoricOf,
  getSynonymsTaxonomicOf,
  getInvalidDesignationsOf,
  getMisidentificationsOf,
  getBasionymOf,
  getAcceptedOf,
  getBasionymFor,
  getReplacedFor,
  getNomenNovumFor,
};
