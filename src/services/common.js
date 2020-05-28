import axios from 'axios';
import template from 'url-template';

const getById = async (id, uri) => {
  const parsedUri = template.parse(uri).expand({ id });
  const result = await axios.get(parsedUri);
  return result.data;
};

export default {
  getById,
};
