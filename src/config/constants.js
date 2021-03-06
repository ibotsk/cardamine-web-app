
export const xRevisedOptions = ['7', '8', '11', '15', '23']
  .map((e) => ({ value: e, label: e }));

export const ploidyRevisedOptions = ['2x', '3x', '4x', '6x', '8x', '12x']
  .map((e) => ({ value: e, label: e }));

export const chromosomesSearchType = {
  latestRevision: {
    key: 'latestRevision',
    forRequest: 'latestRevision',
  },
  originalIdentification: {
    key: 'original',
    forRequest: 'original',
  },
  all: {
    key: 'all',
    forRequest: ['latestRevision', 'original', 'accepted'],
  },
};
