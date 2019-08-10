import axios from 'axios';
import template from 'url-template';

import config from '../config';

const getSpeciesById = async id => {
    const uri = template.parse(config.uris.checklist.getSpeciesByIdUri).expand({ id });
    const result = await axios.get(uri);
    return result.data;
}

const getSynonymsNomenclatoricOf = async (id) => {
    const getSynonymsNomenclatoricUri = template.parse(config.uris.checklist.getNomenclatoricSynonymsUri).expand({ id });
    const response = await axios.get(getSynonymsNomenclatoricUri);
    return response.data;
}

const getSynonymsTaxonomicOf = async (id) => {
    const getSynonymsTaxonomicUri = template.parse(config.uris.checklist.getTaxonomicSynonymsUri).expand({ id });
    const response = await axios.get(getSynonymsTaxonomicUri);
    return response.data;
}

const getInvalidDesignationsOf = async (id) => {
    const getInvalidDesignationsUri = template.parse(config.uris.checklist.getInvalidSynonymsUri).expand({ id });
    const response = await axios.get(getInvalidDesignationsUri);
    return response.data;
}

export default {
    getSpeciesById,
    getSynonymsNomenclatoricOf,
    getSynonymsTaxonomicOf,
    getInvalidDesignationsOf
};