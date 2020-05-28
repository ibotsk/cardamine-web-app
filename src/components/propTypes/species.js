import PropTypes from 'prop-types';

export default {
  type: PropTypes.shape({
    id: PropTypes.number,
    ntype: PropTypes.string,
    authors: PropTypes.string,
    authorsH: PropTypes.string,
    forma: PropTypes.string,
    formaH: PropTypes.string,
    genus: PropTypes.string,
    genusH: PropTypes.string,
    hybrid: PropTypes.bool,
    indLoc: PropTypes.string,
    isBasionym: PropTypes.bool,
    isIsonym: PropTypes.bool,
    proles: PropTypes.string,
    publication: PropTypes.string,
    referenceToTypeDesignation: PropTypes.string,
    species: PropTypes.string,
    speciesH: PropTypes.string,
    subsp: PropTypes.string,
    subspH: PropTypes.string,
    subvar: PropTypes.string,
    subvarH: PropTypes.string,
    tribus: PropTypes.string,
    typeLocality: PropTypes.string,
    typification: PropTypes.string,
    unranked: PropTypes.string,
    var: PropTypes.string,
    varH: PropTypes.string,
  }),
  defaults: {
    id: null,
    ntype: null,
    authors: null,
    authorsH: null,
    forma: null,
    formaH: null,
    genus: null,
    genusH: null,
    hybrid: false,
    indLoc: null,
    isBasionym: false,
    isIsonym: false,
    proles: null,
    publication: null,
    referenceToTypeDesignation: null,
    species: null,
    speciesH: null,
    subsp: null,
    subspH: null,
    subvar: null,
    subvarH: null,
    tribus: null,
    typeLocality: null,
    typification: null,
    unranked: null,
    var: null,
    varH: null,
  },
};
