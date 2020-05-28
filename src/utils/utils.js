import config from '../config';

const isEmptyObj = (obj) => (
  Object.entries(obj).length === 0 && obj.constructor === Object
);

const getSpeciesDetailUri = (id) => (
  config.routes.nameDetail.replace(':id', id)
);

export default {
  isEmptyObj,
  getSpeciesDetailUri,
};
