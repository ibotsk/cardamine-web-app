import axios from 'axios';
import template from 'url-template';

import config from '../config';

const { uris } = config;

async function getAllGrouped(where = {}) {
  const parsedUri = template
    .parse(uris.cdataSearch.getAllGroupedUri)
    .expand({
      where: JSON.stringify(where),
    });
  const result = await axios.get(parsedUri);
  return result.data;
}

async function getCount(where = {}) {
  const parsedUri = template
    .parse(uris.cdataSearch.getCountUri)
    .expand({
      where: JSON.stringify(where),
    });
  const result = await axios.get(parsedUri);
  return result.data;
}

export default {
  getAllGrouped,
  getCount,
};
