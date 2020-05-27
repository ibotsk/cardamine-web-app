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
  
  console.log(name);
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

function listOfSpeciesSorterLex(losA, losB) {
  // a > b = 1
  if (losA.genus > losB.genus) {
    return 1;
  }
  if (losA.genus < losB.genus) {
    return -1;
  }
  if (losA.species > losB.species) {
    return 1;
  }
  if (losA.species < losB.species) {
    return -1;
  }
  if (losA.subsp > losB.subsp) {
    return 1;
  }
  if (losA.subsp < losB.subsp) {
    return -1;
  }
  if (losA.var > losB.var) {
    return 1;
  }
  if (losA.var < losB.var) {
    return -1;
  }
  if (losA.forma > losB.forma) {
    return 1;
  }
  if (losA.forma < losB.forma) {
    return -1;
  }
  if (losA.subvar > losB.subvar) {
    return 1;
  }
  if (losA.subvar < losB.subvar) {
    return -1;
  }
  if (losA.authors > losB.authors) {
    return 1;
  }
  if (losA.authors < losB.authors) {
    return -1;
  }
  // hybrid fields next
  if (losA.genusH > losB.genusH) {
    return 1;
  }
  if (losA.genusH < losB.genusH) {
    return -1;
  }
  if (losA.speciesH > losB.speciesH) {
    return 1;
  }
  if (losA.speciesH < losB.speciesH) {
    return -1;
  }
  if (losA.subspH > losB.subspH) {
    return 1;
  }
  if (losA.subspH < losB.subspH) {
    return -1;
  }
  if (losA.varH > losB.varH) {
    return 1;
  }
  if (losA.varH < losB.varH) {
    return -1;
  }
  if (losA.formaH > losB.formaH) {
    return 1;
  }
  if (losA.formaH < losB.formaH) {
    return -1;
  }
  if (losA.subvarH > losB.subvarH) {
    return 1;
  }
  if (losA.subvarH < losB.subvarH) {
    return -1;
  }
  if (losA.authorsH > losB.authorsH) {
    return 1;
  }
  if (losA.authorsH < losB.authorsH) {
    return -1;
  }
  return 0;
}

function makeWhere(filters) {
  const whereList = [];
  const keys = Object.keys(filters);
  for (const key of keys) {
    whereList.push({
      [key]: {
        like: `%${filters[key].filterVal}%`,
      },
    });
  }
  if (whereList.length > 1) {
    return { OR: whereList };
  }
  if (whereList.length === 1) {
    return whereList[0];
  }
  return {};
}

function parsePublication(publication) {
  const {
    type, authors, title, series, volume, issue,
    publisher, editor, year, pages, journal,
  } = publication;
  const typeMapping = config.mappings.displayType[type].name;
  const template = config.nomenclature.publication[typeMapping];

  return Mustache.render(template, {
    authors,
    title,
    series,
    volume,
    issue: issue ? `(${issue})` : '',
    publisher,
    editor,
    year,
    pages,
    journal,
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

export default {
  listOfSpeciesForComponent,
  listOfSpeciesString,
  listOfSpeciesSorterLex,
  makeWhere,
  parsePublication,
  publicationCurateFields,
};
