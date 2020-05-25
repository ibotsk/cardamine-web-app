import axios from 'axios';
import template from 'url-template';

import config from '../config';

const getById = async (id, uri) => {
  const parsedUri = template.parse(uri).expand({ id });
  const result = await axios.get(parsedUri);
  return result.data;
};

async function getSpeciesById(id) {
  return getById(id, config.uris.checklist.getSpeciesByIdUri);
}

async function getSynonymsNomenclatoricOf(id) {
  return getById(id, config.uris.checklist.getNomenclatoricSynonymsUri);
}

async function getSynonymsTaxonomicOf(id) {
  return getById(id, config.uris.checklist.getTaxonomicSynonymsUri);
}

async function getInvalidDesignationsOf(id) {
  return getById(id, config.uris.checklist.getInvalidSynonymsUri);
}

async function getBasionymOf(id) {
  return getById(id, config.uris.checklist.getBasionymUri);
}

async function getAcceptedOf(id) {
  return getById(id, config.uris.checklist.getAcceptedNameUri);
}

async function getBasionymFor(id) {
  return getById(id, config.uris.checklist.getBasionymForUri);
}

async function getReplacedFor(id) {
  return getById(id, config.uris.checklist.getReplacedForUri);
}

async function getNomenNovumFor(id) {
  return getById(id, config.uris.checklist.getNomenNovumForUri);
}

export default {
  getSpeciesById,
  getSynonymsNomenclatoricOf,
  getSynonymsTaxonomicOf,
  getInvalidDesignationsOf,
  getBasionymOf,
  getAcceptedOf,
  getBasionymFor,
  getReplacedFor,
  getNomenNovumFor,
};
