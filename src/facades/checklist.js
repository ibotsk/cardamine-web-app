import { checklist } from '../services';

const getSpeciesById = async id => {
    return checklist.getSpeciesById(id);
}

export default {
    getSpeciesById
};