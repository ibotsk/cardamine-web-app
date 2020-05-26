import services from '../services';
import { helper } from '../utils';

const { checklist: checklistService } = services;

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

async function getAcceptedOf(id) {
  return checklistService.getAcceptedOf(id);
}

export default {
  getSpeciesById,
  getSynonyms,
  getFors,
  getBasionymOf,
  getAcceptedOf,
};
