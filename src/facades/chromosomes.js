import { chromosomes as chromosomesService } from '../services';

async function getRecordById(id) {
  return chromosomesService.getRecordById(id);
}

export default {
  getRecordById,
};
