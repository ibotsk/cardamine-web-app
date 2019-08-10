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

export default {
    getSpeciesById,
    getSynonyms
};