import { chromosomes as chromosomesService } from '../services';

async function getRecordById(id) {
  const record = await chromosomesService.getRecordById(id);

  const dna = record.dna || {};
  const material = record.material || {};
  const reference = material.reference
    ? material.reference
    : {};
  const latestRevision = record['latest-revision'] || {};

  delete material.reference;
  delete record.material;
  delete record.dna;
  delete record['latest-revision'];

  return {
    record,
    dna,
    material,
    reference,
    latestRevision,
  };
}

export default {
  getRecordById,
};
