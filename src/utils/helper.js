import Mustache from 'mustache';
import config from '../config';
import formatter from './formatter';

const configName = config.nomenclature.name;
const ff = config.format.formatted;
const plf = config.format.plain;

// ---------CONVENIENCE----------- //

const o = (string, format) => {
  let s = '';
  if (string) {
    s = string.trim();
  }
  return { string: s, format };
};

const Formatted = (string) => o(string, ff);
const Plain = (string) => o(string, plf);

const makeSl = (string) => {
  const { sl } = configName;
  if (string && string.includes(sl)) {
    const modString = string.replace(sl, '');
    return { s: modString, hasSl: true };
  }
  return { s: string, hasSl: false };
};

/*
    For every property in config.nomenclature.name.infra

    Names of the infra taxa must match the ones of the listOfSpecies table columns.
    Notho- are not used.
*/
const infraTaxa = (nomenclature) => {
  let infs = [];

  const configInfraTaxa = configName.infra;

  for (const infra of Object.keys(configInfraTaxa)) {
    const infraValue = nomenclature[infra];

    if (infraValue) {
      const infraLabel = configInfraTaxa[infra];
      infs = infs.concat([Plain(infraLabel), Formatted(infraValue)]);
    }
  }

  return infs;
};

const invalidDesignation = (name, syntype) => {
  if (syntype === '1') {
    let newname = [];
    newname.push(Plain('"'));
    newname = newname.concat(name);
    newname.push(Plain('"'));
    return newname;
  }
  return name;
};

const listOfSpeciesFormat = (nomenclature, options = {}) => {
  const opts = {
    isPublication: false,
    isTribus: false,
    ...options,
  };
  const {
    species, genus,
    subsp, var: varieta, forma,
    authors, publication, tribus,
  } = nomenclature;

  let isAuthorLast = true;

  let name = [];
  const slResult = makeSl(species);

  name.push(Formatted(genus));
  name.push(Formatted(slResult.s));

  if (slResult.hasSl) {
    name.push(Plain(configName.sl));
  }

  const infras = infraTaxa(nomenclature);

  if (species === subsp || species === varieta || species === forma) {
    if (authors) {
      name.push(Plain(authors));
    }
    isAuthorLast = false;
  }

  name = name.concat(infras);

  if (isAuthorLast) {
    name.push(Plain(authors));
  }

  if (nomenclature.hybrid) {
    const h = {
      genus: nomenclature.genusH,
      species: nomenclature.speciesH,
      subsp: nomenclature.subspH,
      var: nomenclature.varH,
      subvar: nomenclature.subvarH,
      forma: nomenclature.formaH,
      nothosubsp: nomenclature.nothosubspH,
      nothoforma: nomenclature.nothoformaH,
      authors: nomenclature.authorsH,
    };
    name.push(Plain(configName.hybrid));
    name = name.concat(listOfSpeciesFormat(h));
  }

  name = invalidDesignation(name, options.syntype);

  if (opts.isPublication && publication) {
    name.push(Plain(','));
    name.push(Plain(publication));
  }
  if (opts.isTribus && tribus) {
    name.push(Plain(tribus));
  }
  return name;
};

// --------------PUBLIC----------- //

function listOfSpeciesForComponent(name, formatString, options = {}) {
  const nameArr = listOfSpeciesFormat(name, options);

  const formattedNameArr = nameArr.map((t) => {
    if (t.format === ff) {
      return formatter.format(t.string, formatString);
    }
    return t.string;
  });

  return formattedNameArr
    .reduce((acc, el) => acc.concat(el, ' '), [])
    .slice(0, -1)
    .filter((e, i, arr) => ( // remove all spaces that are followed by a comma
      e !== ' ' || arr[i + 1] === undefined || arr[i + 1] !== ','
    ));
}

function listOfSpeciesString(name) {
  return listOfSpeciesForComponent(name, 'plain').join('');
}

function parsePublication(publication) {
  const {
    displayType, paperAuthor, paperTitle,
    seriesSource, volume, issue,
    publisher, editor, year, pages, journalName,
  } = publication;
  const template = config.mappings.publication[displayType];

  return Mustache.render(template, {
    authors: paperAuthor,
    title: paperTitle,
    series: seriesSource,
    volume,
    issue: issue ? `(${issue})` : '',
    publisher,
    editor,
    year,
    pages,
    journal: journalName,
  });
}

// useful when changing type of publication, so the unused fields are set to empty
function publicationCurateFields(publication) {
  const { displayType } = publication;
  const usedFields = config.mappings.displayType[displayType].columns;
  const fieldsToBeEmpty = config.mappings.displayType.nullableFields.filter(
    (el) => !usedFields.includes(el),
  );

  const curatedPubl = { ...publication };
  for (const field of fieldsToBeEmpty) {
    curatedPubl[field] = '';
  }
  return curatedPubl;
}

function getLosFromCdataSearchResult(obj, prefix) {
  const newObj = {};
  Object.keys(obj).filter((k) => k.startsWith(prefix))
    .forEach((k) => {
      const newKey = k.replace(prefix, '');
      const newKeyFirstLC = newKey.charAt(0).toLowerCase() + newKey.slice(1);
      newObj[newKeyFirstLC] = obj[k];
    });
  return newObj;
}

export default {
  listOfSpeciesForComponent,
  listOfSpeciesString,
  parsePublication,
  publicationCurateFields,
  getLosFromCdataSearchResult,
};
