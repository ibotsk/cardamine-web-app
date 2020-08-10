import { chromosomes as chromosomesService } from '../services';

async function getAllByIds(ids, offset, limit) {
  const records = await chromosomesService.getAllByIds(ids, offset, limit);

  const flattened = records.map((r) => {
    const rr = r;
    if (r.material && r.material.reference && r.material.reference.literature) {
      rr.literature = r.material.reference.literature;
      delete rr.material;
    }
    return rr;
  });
  return flattened;
}

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
  getAllByIds,
  getRecordById,
};
