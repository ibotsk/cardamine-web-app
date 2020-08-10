import template from 'url-template';
import common from './common';

import config from '../config';

const { getById, getAll } = common;

async function getAllByIds(ids, offset = 0, limit = 25) {
  const uri = template.parse(config.uris.chromosomes.getAllByIdsUri)
    .expand({ ids, limit, offset });
  return getAll(uri);
}

async function getRecordById(id) {
  return getById(id, config.uris.chromosomes.getByIdUri);
}

export default {
  getAllByIds,
  getRecordById,
};
