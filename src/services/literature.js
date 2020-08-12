import common from './common';
import config from '../config';

const { getAll } = common;
const { uris } = config;

async function getAllPaperAuthors() {
  return getAll(uris.literature.getAllPaperAuthorsUri);
}

export default {
  getAllPaperAuthors,
};
