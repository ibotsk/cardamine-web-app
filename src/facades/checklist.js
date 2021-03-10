import { checklist as checklistService } from '../services';
import { comparators } from '../utils';

async function getAllSpecies(where, offset, limit) {
  return checklistService.getAll(where, offset, limit);
}

async function getAllCount(where) {
  const countObj = await checklistService.getCount(where);
  return countObj.count;
}

async function getSpeciesById(id) {
  const record = await checklistService.getSpeciesById(id);

  const {
    accepted, basionym, replaced, nomenNovum, ...species
  } = record;

  delete record.accepted;
  delete record.basionym;
  delete record.replaced;
  delete record.nomenNovum;

  return {
    species,
    accepted,
    basionym,
    replaced,
    nomenNovum,
  };
}

async function getSynonyms(id) {
  const nomenclatoricSynonyms = await checklistService
    .getSynonymsNomenclatoricOf(id);

  const taxonomicSynonyms = await checklistService
    .getSynonymsTaxonomicOf(id);

  const invalidDesignations = await checklistService
    .getInvalidDesignationsOf(id);

  const misidentifications = await checklistService
    .getMisidentificationsOf(id);

  return {
    nomenclatoricSynonyms,
    taxonomicSynonyms,
    invalidDesignations,
    misidentifications,
  };
}

async function getFors(id) {
  const {
    basionymFor,
    replacedFor,
    nomenNovumFor,
  } = await checklistService.getForRelations(id);

  basionymFor.sort(comparators.listOfSpeciesLex);
  replacedFor.sort(comparators.listOfSpeciesLex);
  nomenNovumFor.sort(comparators.listOfSpeciesLex);

  return {
    basionymFor,
    replacedFor,
    nomenNovumFor,
  };
}

export default {
  getAllSpecies,
  getAllCount,
  getSpeciesById,
  getSynonyms,
  getFors,
};
