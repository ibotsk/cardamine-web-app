import { cdataSearch as cdataSearchService } from '../services';

async function getAll(where) {
  return cdataSearchService.getAll(where);
}

export default {
  getAll,
};
