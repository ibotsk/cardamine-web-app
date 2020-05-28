import common from './common';

import config from '../config';

const { getById } = common;

async function getRecordById(id) {
  return getById(id, config.uris.chromosomes.getByIdUri);
}

export default {
  getRecordById,
};
