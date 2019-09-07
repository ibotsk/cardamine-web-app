import { checklist as checklistService } from '../services';
import { helper } from '../utils';

const getSpeciesById = async id => {
    return checklistService.getSpeciesById(id);
}

const getSynonyms = async (id) => {

    const nomenclatoricSynonyms = await checklistService.getSynonymsNomenclatoricOf(id);
    nomenclatoricSynonyms.sort(helper.listOfSpeciesSorterLex);

    const taxonomicSynonyms = await checklistService.getSynonymsTaxonomicOf(id);
    taxonomicSynonyms.sort(helper.listOfSpeciesSorterLex);

    const invalidDesignations = await checklistService.getInvalidDesignationsOf(id);
    invalidDesignations.sort(helper.listOfSpeciesSorterLex);

    return { nomenclatoricSynonyms, taxonomicSynonyms, invalidDesignations };
}

const getFors = async (id) => {
    const basionymFor = await checklistService.getBasionymFor(id);
    basionymFor.sort(helper.listOfSpeciesSorterLex);

    const replacedFor = await checklistService.getReplacedFor(id);
    replacedFor.sort(helper.listOfSpeciesSorterLex);

    const nomenNovumFor = await checklistService.getNomenNovumFor(id);
    nomenNovumFor.sort(helper.listOfSpeciesSorterLex);

    return { basionymFor, replacedFor, nomenNovumFor };
}

const getBasionymOf = async (id) => {
    return checklistService.getBasionymOf(id);
}

const getAcceptedOf = async (id) => {
    return checklistService.getAcceptedOf(id);
}

export default {
    getSpeciesById,
    getSynonyms,
    getFors,
    getBasionymOf,
    getAcceptedOf
};