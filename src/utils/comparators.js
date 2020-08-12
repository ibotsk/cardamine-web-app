import helper from './helper';

function listOfSpeciesLex(losA, losB) {
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

function cdataGroupedLatestRevision(resA, resB) {
  const latestRevisionPrefix = 'latestRevision';
  const losA = helper.getLosFromCdataSearchResult(resA, latestRevisionPrefix);
  const losB = helper.getLosFromCdataSearchResult(resB, latestRevisionPrefix);
  return listOfSpeciesLex(losA, losB);
}

export default {
  listOfSpeciesLex,
  cdataGroupedLatestRevision,
};
