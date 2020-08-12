import { persons as personsService } from '../services';

async function getAllPersons(format) {
  const persons = await personsService.getAll();

  if (format) {
    return persons.map(format);
  }
  return persons;
}

export default {
  getAllPersons,
};
