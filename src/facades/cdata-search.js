import { cdataSearch as cdataSearchService } from '../services';
import { comparators } from '../utils';

async function getAllGrouped(searchFields) {
  const results = await cdataSearchService.getAllGrouped(searchFields);

  results.sort(comparators.cdataGroupedLatestRevision);
  return results;
}

export default {
  getAllGrouped,
};
