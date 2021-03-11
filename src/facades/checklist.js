import { checklist as checklistService } from '../services';
import { comparators } from '../utils';

async function searchChecklist(
  genus, species, infraspecific, authors, types, rowsPerPage, page,
) {
  const searchFields = {
    genus,
    species,
    infraspecific,
    authors,
    status: types,
  };
  return checklistService.searchChecklist(searchFields, rowsPerPage, page);
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
  const {
    nomenclatoricSynonyms,
    taxonomicSynonyms,
  } = await checklistService.getSynonymsOfId(id);

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
  searchChecklist,
  getSpeciesById,
  getSynonyms,
  getFors,
};
