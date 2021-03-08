/* eslint-disable max-len */

const backendBaseOld = `${process.env.REACT_APP_OLD_BACKEND_BASE}:${process.env.REACT_APP_OLD_BACKEND_PORT}`;
const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

const uris = {
  checklist: {
    getAllWFilter: `${backendBaseOld}/api/list-of-species?filter=%7B
      "where":{where},
      "offset":{offset},
      "limit":{limit},
      "include":"accepted",
      "order":[
        "ntype_order","genus","species","subsp","var","subvar","forma","unranked","authors",
        "genus_h","species_h","subsp_h","var_h","subvar_h","forma_h","authors_h","id"
      ]%7D`,
    getSpeciesByIdUri: `${backendBaseOld}/api/list-of-species/{id}`,
    getAcceptedNameUri: `${backendBaseOld}/api/list-of-species/{id}/accepted`,
    getNomenclatoricSynonymsUri: `${backendBaseOld}/api/list-of-species/{id}/synonyms-nomenclatoric`,
    getTaxonomicSynonymsUri: `${backendBaseOld}/api/list-of-species/{id}/synonyms-taxonomic?filter=%7B"include":"synonyms-nomenclatoric"%7D`,
    getInvalidSynonymsUri: `${backendBaseOld}/api/list-of-species/{id}/synonyms-invalid`,
    getMisidentificationsUri: `${backendBaseOld}/api/list-of-species/{id}/synonyms-misidentification`,
    getBasionymUri: `${backendBaseOld}/api/list-of-species/{id}/basionym`,
    getReplacedUri: `${backendBaseOld}/api/list-of-species/{id}/replaced`,
    getNomenNovumUri: `${backendBaseOld}/api/list-of-species/{id}/nomen-novum`,
    getBasionymForUri: `${backendBaseOld}/api/list-of-species/{id}/basionym-for`,
    getReplacedForUri: `${backendBaseOld}/api/list-of-species/{id}/replaced-for`,
    getNomenNovumForUri: `${backendBaseOld}/api/list-of-species/{id}/nomen-novum-for`,
    getCount: `${backendBaseOld}/api/list-of-species/count?where={where}`,
  },
  chromosomes: {
    getAllByIdsUri: `${backendBaseOld}/api/cdata?filter=%7B
      "fields":["id","n","dn","ploidyLevel","ploidyLevelRevised"],
      "include":[
        "dna",
        %7B
          "material": %7B
            "reference": "literature"
          %7D
        %7D
      ],
      "where":%7B
        "id":%7B"inq":[{ids}]%7D
      %7D,
      "limit":{limit},
      "offset":{offset},
      "order":"id"
    %7D`,
    getByIdUri: `${backendBaseOld}/api/cdata/{id}?filter=%7B
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
    getAllGroupedUri: `${backendBaseOld}/api/cdata-searches/grouped?filter=%7B"where":{where}%7D`,
    getCountUri: `${backendBaseOld}/api/cdata-searches/count?where={where}`,
  },
  literature: {
    getAllPaperAuthorsUri: `${backendBase}/literature?filter=%7B"fields":["paperAuthor"],"order":"paperAuthor"%7D`,
  },
  persons: {
    getAllUri: `${backendBase}/persons?filter=%7B"order":"persName"%7D`,
  },
  worldL1: {
    getAllUri: `${backendBase}/worlds/level1?filter=%7B"order":"description"%7D`,
  },
  worldL2: {
    getAllUri: `${backendBase}/worlds/level2?filter=%7B"order":"description"%7D`,
  },
  worldL3: {
    getAllUri: `${backendBase}/worlds/level3?filter=%7B"order":"description"%7D`,
  },
  worldL4: {
    getAllUri: `${backendBase}/worlds/level4?filter=%7B"order":"description"%7D`,
  },
};

export default uris;
