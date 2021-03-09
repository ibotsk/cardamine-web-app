import config from '../config';
import { chromosomesSearchType as cst } from '../config/constants';

const { name: nameConfig } = config.nomenclature;
const { searchColumns } = config.mappings;

// ---- PRIVATE ---- //

const like = (value) => ({ like: `%${value}%` });

/**
 * the more specific world overrides the general ones
 * @param {*} idWorldL1
 * @param {*} idWorldL2
 * @param {*} idWorldL3
 * @param {*} idWorldL4
 */
const worldsWhere = (idWorldL1, idWorldL2, idWorldL3, idWorldL4) => {
  if (idWorldL4) {
    return { idWorldL4 };
  }
  if (idWorldL3) {
    return { idWorldL3 };
  }
  if (idWorldL2) {
    return { idWorldL2 };
  }
  if (idWorldL1) {
    return { idWorldL1 };
  }
  return undefined;
};

const coordinatesWhere = (coordinatesLatDec, coordinatesLonDec, range = 0) => {
  const coordinates = [];
  if (coordinatesLatDec) {
    if (range) {
      const latBottom = coordinatesLatDec - range;
      const latTop = coordinatesLatDec + range;
      coordinates.push(
        {
          coordinatesLatDec: { gte: latBottom },
        },
        {
          coordinatesLatDec: { lte: latTop },
        },
      );
    } else {
      // if not range, make it equal
      coordinates.push({ coordinatesLatDec });
    }
  }
  if (coordinatesLonDec) {
    if (range) {
      const lonBottom = coordinatesLonDec - range;
      const lonTop = coordinatesLonDec + range;
      coordinates.push(
        {
          coordinatesLonDec: { gte: lonBottom },
        },
        {
          coordinatesLonDec: { lte: lonTop },
        },
      );
    } else {
      coordinates.push({ coordinatesLonDec });
    }
  }
  return coordinates;
};

const commonWhere = (
  n, dn, xRevised, ploidyLevelRevised,
  publicationAuthor, analysisAuthor,
  worldL1, worldL2, worldL3, worldL4,
  latitudeDegrees, longitudeDegrees, range,
) => {
  const result = [];

  if (dn) {
    result.push({
      or: [
        { dn },
        { chCount: dn },
      ],
    });
  }
  if (n) {
    result.push({ n });
  }
  if (xRevised) {
    result.push({ xRevised });
  }
  if (ploidyLevelRevised) {
    result.push({
      or: [
        { ploidyLevelRevised },
        { ploidyRevised: ploidyLevelRevised },
      ],
    });
  }
  if (analysisAuthor) {
    result.push({ countedBy: analysisAuthor });
  }
  if (publicationAuthor) {
    result.push({ paperAuthor: like(publicationAuthor) });
  }

  const world = worldsWhere(worldL1, worldL2, worldL3, worldL4);
  if (world) {
    result.push(world);
  }

  const coordinates = coordinatesWhere(
    latitudeDegrees, longitudeDegrees, range,
  );
  // coordinates is an array
  result.push(...coordinates);

  if (result.length > 0) {
    result.and = result;
  }

  return result;
};

/**
 * This function is table specific, where properties are in camel-case
 * @param {*} genus
 * @param {*} species
 * @param {*} infraspecific
 * @param {*} columnPrefix
 */
const nameWhere = (genus, species, infra, searchTypes) => {
  // const {
  //   genus: genusCols,
  //   species: speciesCols,
  //   infraspecific: infraCols,
  // } = searchColumns[searchType];
  let genusCols = [];
  let speciesCols = [];
  let infraCols = [];

  searchTypes.forEach((searchType) => {
    const columns = searchColumns[searchType];
    genusCols = [...genusCols, ...columns.genus];
    speciesCols = [...speciesCols, ...columns.species];
    infraCols = [...infraCols, ...columns.infraspecific];
  });

  const result = [];

  if (genus) {
    result.push({
      or: genusCols.map((c) => ({ [c]: like(genus) })),
    });
  }
  if (species) {
    result.push({
      or: speciesCols.map((c) => ({ [c]: like(species) })),
    });
  }
  if (infra) {
    result.push({
      or: infraCols.map((c) => ({ [c]: like(infra) })),
    });
  }
  return result;
};

// columns with latestRevision prefix
const makeCdataLatestRevisionWhere = (
  genus, species, infraspecific,
) => nameWhere(genus, species, infraspecific, ['latestRevision']);

const makeCdataOriginalIdentificationWhere = (
  genus, species, infraspecific,
) => nameWhere(genus, species, infraspecific, ['original']);

const makeCdataAllIdentificationsWhere = (
  genus, species, infraspecific,
) => nameWhere(genus, species, infraspecific,
  ['latestRevision', 'original', 'accepted']);

// ---- PUBLIC ---- //

function makeChecklistWhere(genus, species, infra, authors, types) {
  const result = {};
  if (genus) {
    result.genus = like(genus);
  }
  if (species) {
    result.species = like(species);
  }
  if (authors) {
    result.authors = like(authors);
  }
  if (infra) {
    result.or = Object.keys(nameConfig.infra).map((inf) => ({
      [inf]: like(infra),
    }));
  }
  if (types.length > 0) {
    result.ntype = {
      inq: types,
    };
  }
  return result;
}

function makeCdataSearchWhere(searchType, params) {
  const {
    n, dn, xRevised, ploidyLevelRevised,
    genus, species, infraspecific,
    publicationAuthor, analysisAuthor,
    worldL1, worldL2, worldL3, worldL4,
    latitudeDegrees, longitudeDegrees, range,
  } = params;

  const common = commonWhere(
    n, dn, xRevised, ploidyLevelRevised,
    publicationAuthor, analysisAuthor,
    worldL1, worldL2, worldL3, worldL4,
    latitudeDegrees, longitudeDegrees, range,
  );

  let specific = [];
  switch (searchType) {
    case cst.lastRevision:
      specific = makeCdataLatestRevisionWhere(
        genus, species, infraspecific,
      );
      break;
    case cst.originalIdentification:
      specific = makeCdataOriginalIdentificationWhere(
        genus, species, infraspecific,
      );
      break;
    case cst.all:
      specific = makeCdataAllIdentificationsWhere(
        genus, species, infraspecific,
      );
      break;
    default:
      throw new Error(`Unknown chrom data search type: ${searchType}`);
  }

  const result = [...common, ...specific];
  if (result.length > 0) {
    return {
      and: result,
    };
  }
  return {};
}

export default {
  makeChecklistWhere,
  makeCdataSearchWhere,
};
