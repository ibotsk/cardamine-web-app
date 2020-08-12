import { cdataSearch as cdataSearchService } from '../services';
import { comparators } from '../utils';

async function getAllGrouped(where) {
  const results = await cdataSearchService.getAllGrouped(where);

  results.sort(comparators.cdataGroupedLatestRevision);
  return results;
}

async function getAllCount(where) {
  const countObj = await cdataSearchService.getCount(where);
  return countObj.count;
}

export default {
  getAllGrouped,
  getAllCount,
};
