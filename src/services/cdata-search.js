import axios from 'axios';
import template from 'url-template';

import config from '../config';

const { uris } = config;

async function getAll(where = {}) {
  const parsedUri = template
    .parse(uris.cdataSearch.getAllUri)
    .expand({
      where: JSON.stringify(where),
    });
  const result = await axios.get(parsedUri);
  return result.data;
}

export default {
  getAll,
};
