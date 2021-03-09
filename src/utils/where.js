import config from '../config';

const { name: nameConfig } = config.nomenclature;

// ---- PRIVATE ---- //

const like = (value) => ({ like: `%${value}%` });

// ---- PUBLIC ---- //

function makeChecklistWhere(genus, species, infra, authors, types) {
  const result = {};
  if (genus) {
    result.genus = like(genus);
  }
  if (species) {
    result.species = like(species);
  }
  if (authors) {
    result.authors = like(authors);
  }
  if (infra) {
    result.or = Object.keys(nameConfig.infra).map((inf) => ({
      [inf]: like(infra),
    }));
  }
  if (types.length > 0) {
    result.ntype = {
      inq: types,
    };
  }
  return result;
}

export default {
  makeChecklistWhere,
};
