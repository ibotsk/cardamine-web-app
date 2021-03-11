import axios from 'axios';
import template from 'url-template';
import common from './common';

import config from '../config';

const { getById } = common;

async function getAllByIds(ids, offset = 0, limit = 25) {
  const uri = template.parse(config.uris.chromosomes.getAllByIdsUri)
    .expand();
  const request = {
    ids,
    offset,
    limit,
  };
  const result = await axios.post(uri, request);
  return result.data;
}

async function getRecordById(id) {
  return getById(id, config.uris.chromosomes.getByIdUri);
}

export default {
  getAllByIds,
  getRecordById,
};
