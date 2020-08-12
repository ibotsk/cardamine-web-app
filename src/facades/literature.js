import { literature as literatureFacade } from '../services';

async function getAllPaperAuthors(format) {
  const authors = await literatureFacade.getAllPaperAuthors();
  const paperAuthors = authors.map(({ paperAuthor }) => paperAuthor);

  const unique = [...new Set(paperAuthors)];

  if (format) {
    return unique.map(format);
  }
  return unique;
}

export default {
  getAllPaperAuthors,
};
