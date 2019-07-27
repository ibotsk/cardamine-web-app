import axios from 'axios';
import template from 'url-template';

import config from '../config';

const getSpeciesById = async id => {
    const uri = template.parse(config.uris.checklist.getSpeciesByIdUri).expand({ id });
    const result = await axios.get(uri);
    return result.data;
}

export default {
    getSpeciesById
};