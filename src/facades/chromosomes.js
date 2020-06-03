import { chromosomes as chromosomesService } from '../services';

async function getRecordById(id) {
  const record = await chromosomesService.getRecordById(id);

  const dna = record.dna || {};
  const material = record.material || {};
  const reference = material.reference
    ? material.reference
    : {};

  delete material.reference;
  delete record.material;
  delete record.dna;

  return {
    record,
    dna,
    material,
    reference,
  };
}

export default {
  getRecordById,
};
