import config from '../config';
import common from './common';

const { getAll } = common;

async function getWorld1s() {
  const { getAllUri } = config.uris.worldL1;
  return getAll(getAllUri);
}

async function getWorld2s() {
  const { getAllUri } = config.uris.worldL2;
  return getAll(getAllUri);
}

async function getWorld3s() {
  const { getAllUri } = config.uris.worldL3;
  return getAll(getAllUri);
}

async function getWorld4s() {
  const { getAllUri } = config.uris.worldL4;
  return getAll(getAllUri);
}

export default {
  getWorld1s,
  getWorld2s,
  getWorld3s,
  getWorld4s,
};
