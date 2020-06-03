/* eslint-disable max-len */
import pagination from './pagination';
import uris from './uris';

export default {
  nomenclature: {
    name: {
      sl: 's.l.',
      tribus: 'tribus',
      hybrid: 'x',
      infra: {
        subsp: 'subsp.',
        var: 'var.',
        subvar: 'subvar.',
        forma: 'forma',
        nothosubsp: 'nothosubsp.',
        nothoforma: 'nothoforma',
        proles: 'proles',
        unranked: '[unranked]',
      },
    },
    publication: {
      paper: '{{authors}} ({{year}}) {{title}}. {{journal}}, {{volume}}{{issue}}:{{pages}}',
      book: '{{authors}} ({{year}}) {{title}}. {{publisher}}. {{pages}}',
      manuscript: '{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{publisher}}. {{pages}}',
      chapter: '{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{publisher}}. {{pages}}',
      report: '{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{journal}}, {{volume}}{{issue}}:{{pages}}',
    },
  },
  format: {
    formatted: 'formatted',
    plain: 'plain',
  },
  mappings: {
    losType: {
      A: {
        text: 'Accepted',
        colour: '#57ab27',
      },
      PA: {
        text: 'Provisionally accepted',
        colour: '#ee7f00',
      },
      S: {
        text: 'Synonym',
        colour: '#008fc8',
      },
      DS: {
        text: 'Doubtful synonym',
        colour: '#0089a0',
      },
      U: {
        text: 'Unresolved',
        colour: '#bb9d00',
      },
      I: {
        text: 'Designation not validly published',
        colour: '#ff6666',
      },
      N: {
        text: 'Unassigned',
        colour: '#8b8b8b',
      },
    },
    synonym: {
      nomenclatoric: {
        prefix: '≡',
        className: 'tripple',
      },
      taxonomic: {
        prefix: '=',
        className: 'double',
      },
      invalid: {
        prefix: '–',
        className: 'single',
      },
      misidentification: {
        prefix: '–',
        className: 'single',
      },
    },
    publication: {
      1:
        '{{authors}} ({{year}}) {{title}}. {{journal}}, {{volume}}{{issue}}:{{pages}}',
      2: '{{authors}} ({{year}}) {{title}}. {{publisher}}. {{pages}}',
      3:
        '{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{publisher}}. {{pages}}',
      4:
        '{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{publisher}}. {{pages}}',
      5:
        '{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{journal}}, {{volume}}{{issue}}:{{pages}}',
    },
  },
  routes: {
    home: '/',
    checklist: '/checklist',
    nameDetail: '/checklist/:id',
    chromosomes: '/data',
    chromosomesDetail: '/data/:id',
  },
  uris,
  pagination,
};
