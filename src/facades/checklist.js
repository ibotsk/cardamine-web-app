import { checklist as checklistService } from '../services';
import { helper } from '../utils';

async function getAllSpecies(where, offset, limit) {
  return checklistService.getAll(where, offset, limit);
}

async function getAllCount(where) {
  const countObj = await checklistService.getCount(where);
  return countObj.count;
}

async function getSpeciesById(id) {
  return checklistService.getSpeciesById(id);
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
  const basionymFor = await checklistService.getBasionymFor(id);
  basionymFor.sort(helper.listOfSpeciesSorterLex);

  const replacedFor = await checklistService.getReplacedFor(id);
  replacedFor.sort(helper.listOfSpeciesSorterLex);

  const nomenNovumFor = await checklistService.getNomenNovumFor(id);
  nomenNovumFor.sort(helper.listOfSpeciesSorterLex);

  return {
    basionymFor,
    replacedFor,
    nomenNovumFor,
  };
}

async function getBasionymOf(id) {
  return checklistService.getBasionymOf(id);
}

async function getBasionymReplacedNovumOf(id) {
  const basionym = await checklistService.getBasionymOf(id);
  const replaced = await checklistService.getReplacedOf(id);
  const nomenNovum = await checklistService.getNomenNovumOf(id);

  return {
    basionym,
    replaced,
    nomenNovum,
  };
}

async function getAcceptedOf(id) {
  return checklistService.getAcceptedOf(id);
}

export default {
  getAllSpecies,
  getAllCount,
  getSpeciesById,
  getSynonyms,
  getFors,
  getBasionymOf,
  getBasionymReplacedNovumOf,
  getAcceptedOf,
};
