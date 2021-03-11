import { persons as personsService } from '../services';

async function getAllPersons(format) {
  const persons = await personsService.getAll();
  const personsNotNull = persons
    .map(({ persName }) => persName)
    .filter((p) => !!p);

  const unique = [...new Set(personsNotNull)];
  if (format) {
    return unique.map(format);
  }
  return unique;
}

export default {
  getAllPersons,
};
