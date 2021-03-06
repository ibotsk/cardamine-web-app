import React from 'react';

import config from '../config';

const italic = (subject) => <i>{subject}</i>;

const format = (subject, formatString) => {
  switch (formatString) {
    case 'italic':
      return italic(subject);
    default:
      return subject;
  }
};

// erroneous, doubtful, ambiguous
const eda = ({ ambiguous = false, doubtful = false, erroneous = false }) => {
  const result = [];
  if (ambiguous) {
    result.push('A');
  }
  if (doubtful) {
    result.push('D');
  }
  if (erroneous) {
    result.push('E');
  }
  return result.join('/');
};

const speciesType = (type) => {
  if (type) {
    const losType = config.mappings.losType[type];
    return (
      <span style={{ color: losType.colour }}>{losType.text}</span>
    );
  }
  return undefined;
};

const chromosomes = (dn, n, dnaC, sign = '=') => {
  const fixed = `2n ${sign} `;
  if (dn) {
    return `${fixed}${dn}`;
  }
  if (n) {
    return `${fixed}${2 * n}`;
  }
  if (dnaC) {
    return `${fixed}${dnaC}`;
  }
  return undefined;
};

const genomeSize = (c, from, to, units) => {
  if (!from && !to) {
    return undefined;
  }
  const fromTo = [from, to].filter((e) => !!e).join('-');
  return `${c} = ${fromTo} ${units}`;
};

/**
 * not used
 * @param {*} n 
 * @param {*} dn 
 * @param {*} chCount 
 * @param {*} sizeC 
 * @param {*} sizeFrom 
 * @param {*} sizeTo 
 * @param {*} sizeUnits 
 * @param {*} ploidy 
 * @param {*} ploidyRevised 
 */
const chromosomeInfo = (
  n, dn,
  chCount,
  sizeC,
  sizeFrom,
  sizeTo,
  sizeUnits,
  ploidy,
  ploidyRevised,
) => {
  const result = {
    chromosomeNumber: undefined,
    ploidy: undefined,
    genome: undefined,
  };

  if (n || dn) {
    result.chromosomeNumber = chromosomes(dn, n, chCount);
    return result;
  }
  if (ploidyRevised) {
    result.ploidy = ploidyRevised;
  } else if (ploidy) {
    result.ploidy = ploidy;
  }

  if (sizeFrom || sizeTo) {
    result.genome = genomeSize(sizeC, sizeFrom, sizeTo, sizeUnits);
  }
  return result;
};

export default {
  format,
  eda,
  speciesType,
  chromosomes,
  genomeSize,
  chromosomeInfo,
};
