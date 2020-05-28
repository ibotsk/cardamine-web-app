/* eslint-disable max-len */
import pagination from './pagination';

const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

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
  },
  routes: {
    home: '/',
    checklist: '/checklist',
    chromosomes: '/data',
    nameDetail: '/checklist/:id',
  },
  uris: {
    checklist: {
      getAllWFilter: `${backendBase}/api/list-of-species?filter=%7B
      "where":{where},
      "offset":{offset},
      "limit":{limit},
      "include":"accepted",
      "order":[
        "ntype_order","genus","species","subsp","var","subvar","forma","unranked","authors",
        "genus_h","species_h","subsp_h","var_h","subvar_h","forma_h","authors_h","id"
      ]%7D`,
      getSpeciesByIdUri: `${backendBase}/api/list-of-species/{id}`,
      getAcceptedNameUri: `${backendBase}/api/list-of-species/{id}/accepted`,
      getNomenclatoricSynonymsUri: `${backendBase}/api/list-of-species/{id}/synonyms-nomenclatoric`,
      getTaxonomicSynonymsUri: `${backendBase}/api/list-of-species/{id}/synonyms-taxonomic?filter=%7B"include":"synonyms-nomenclatoric"%7D`,
      getInvalidSynonymsUri: `${backendBase}/api/list-of-species/{id}/synonyms-invalid`,
      getMisidentificationsUri: `${backendBase}/api/list-of-species/{id}/synonyms-misidentification`,
      getBasionymUri: `${backendBase}/api/list-of-species/{id}/basionym`,
      getReplacedUri: `${backendBase}/api/list-of-species/{id}/replaced`,
      getNomenNovumUri: `${backendBase}/api/list-of-species/{id}/nomen-novum`,
      getBasionymForUri: `${backendBase}/api/list-of-species/{id}/basionym-for`,
      getReplacedForUri: `${backendBase}/api/list-of-species/{id}/replaced-for`,
      getNomenNovumForUri: `${backendBase}/api/list-of-species/{id}/nomen-novum-for`,
      getCount: `${backendBase}/api/list-of-species/count?where={where}`,
    },
  },
  pagination,
};
