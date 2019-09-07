import axios from 'axios';
import template from 'url-template';

import config from '../config';

const getById = async (id, uri) => {
    const parsedUri = template.parse(uri).expand({ id });
    const result = await axios.get(parsedUri);
    return result.data;
}

const getSpeciesById = async id => {
    return getById(id, config.uris.checklist.getSpeciesByIdUri);
}

const getSynonymsNomenclatoricOf = async (id) => {
    return getById(id, config.uris.checklist.getNomenclatoricSynonymsUri);
}

const getSynonymsTaxonomicOf = async (id) => {
    return getById(id, config.uris.checklist.getTaxonomicSynonymsUri);
}

const getInvalidDesignationsOf = async (id) => {
    return getById(id, config.uris.checklist.getInvalidSynonymsUri);
}

const getBasionymOf = async (id) => {
    return getById(id, config.uris.checklist.getBasionymUri);
}

const getAcceptedOf = async (id) => {
    return getById(id, config.uris.checklist.getAcceptedNameUri);
}

const getBasionymFor = async (id) => {
    return getById(id, config.uris.checklist.getBasionymForUri);
}

const getReplacedFor = async (id) => {
    return getById(id, config.uris.checklist.getReplacedForUri);
}

const getNomenNovumFor = async (id) => {
    return getById(id, config.uris.checklist.getNomenNovumForUri);
}

export default {
    getSpeciesById,
    getSynonymsNomenclatoricOf,
    getSynonymsTaxonomicOf,
    getInvalidDesignationsOf,
    getBasionymOf,
    getAcceptedOf,
    getBasionymFor,
    getReplacedFor,
    getNomenNovumFor
};