const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

export default {

    nomenclature: {
        name: {
            sl: 's.l.',
            subsp: 'subsp.',
            var: 'var.',
            subvar: 'subvar.',
            forma: 'forma',
            nothosubsp: 'nothosubsp.',
            nothoforma: 'nothoforma',
            proles: 'proles',
            unranked: '[unranked]',
            tribus: 'tribus',
            hybrid: 'x',
        },
        publication: {
            paper: "{{authors}} ({{year}}) {{title}}. {{journal}}, {{volume}}{{issue}}:{{pages}}",
            book: "{{authors}} ({{year}}) {{title}}. {{publisher}}. {{pages}}",
            manuscript: "{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{publisher}}. {{pages}}",
            chapter: "{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{publisher}}. {{pages}}",
            report: "{{authors}} ({{year}}) {{title}}. In: (eds.) {{editor}}, {{series}}. {{journal}}, {{volume}}{{issue}}:{{pages}}"
        }
    },
    format: {
        formatted: "formatted",
        plain: "plain"
    },
    mappings: {
        losType: {
            A: {
                text: "Accepted",
                colour: "#57ab27"
            },
            PA: {
                text: "Provisionally accepted",
                colour: "#ee7f00"
            },
            S: {
                text: "Synonym",
                colour: "#008fc8"
            },
            DS: {
                text: "Doubtful synonym",
                colour: "#0089a0"
            },
            U: {
                text: "Unresolved",
                colour: "#bb9d00"
            }
        },
        synonym: {
            nomenclatoric: {
                prefix: "≡",
                className: "tripple"
            },
            taxonomic: {
                prefix: "=",
                className: "double"
            },
            invalid: {
                prefix: "-",
                className: "single"
            }
        }
    },
    routes: {
        home: "/",
        checklist: "/checklist",
        chromosomes: "/data",
        nameDetail: "/checklist/:id"
    },
    uris: {
        checklist: {
            getSpeciesByIdUri: `${backendBase}/api/list-of-species/{id}`,
            getNomenclatoricSynonymsUri: `${backendBase}/api/list-of-species/{id}/synonyms-nomenclatoric`,
            getTaxonomicSynonymsUri: `${backendBase}/api/list-of-species/{id}/synonyms-taxonomic?filter=%7B"include":"synonyms-nomenclatoric"%7D`,
            getInvalidSynonymsUri: `${backendBase}/api/list-of-species/{id}/synonyms-invalid`,
        }
    }

};