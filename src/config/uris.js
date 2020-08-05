/* eslint-disable max-len */

const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

const uris = {
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
  chromosomes: {
    getByIdUri: `${backendBase}/api/cdata/{id}?filter=%7B
      "include":[
        "counted-by",
        "dna",
        "latest-revision",
        %7B
          "material":[
            %7B
              "world-l4":%7B
                "world-l3":%7B
                  "world-l2":"world-l1"
                %7D
              %7D
            %7D,
            "collected-by",
            "identified-by",
            %7B
              "reference":[
                "literature",
                "original-identification"
              ]
            %7D
          ]
        %7D
    ]
    %7D`,
  },
  cdataSearch: {
    getAllGroupedUri: `${backendBase}/api/cdata-searches/grouped?filter=%7B"where":{where}%7D`,
    getCountUri: `${backendBase}/api/cdata-searches/count?where={where}`,
  },
  literature: {
    getAllPaperAuthorsUri: `${backendBase}/api/literature?filter=%7B"fields":["paperAuthor"],"order":"paperAuthor"%7D`,
  },
  persons: {
    getAllUri: `${backendBase}/api/persons?filter=%7B"order":"persName"%7D`,
  },
  worldL1: {
    getAllUri: `${backendBase}/api/world-l1s?filter=%7B"order":"description"%7D`,
  },
  worldL2: {
    getAllUri: `${backendBase}/api/world-l2s?filter=%7B"order":"description"%7D`,
  },
  worldL3: {
    getAllUri: `${backendBase}/api/world-l3s?filter=%7B"order":"description"%7D`,
  },
  worldL4: {
    getAllUri: `${backendBase}/api/world-l4s?filter=%7B"order":"description"%7D`,
  },
};

export default uris;
