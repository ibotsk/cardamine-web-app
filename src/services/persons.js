import common from './common';
import config from '../config';

const { getAll: getAllCommon } = common;
const { uris } = config;

async function getAll() {
  return getAllCommon(uris.persons.getAllUri);
}

export default {
  getAll,
};
