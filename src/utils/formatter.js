import React from 'react';

import config from '../config';

const italic = (subject) => {
    return <i>{subject}</i>;
}

const format = (subject, format) => {
    switch (format) {
        case 'italic': return italic(subject);
        default: return subject;
    }
}

//erroneous, doubtful, ambiguous
const eda = ({ ambiguous = false, doubtful = false, erroneous = false }) => {
    let result = [];
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
}

const speciesType = type => {
    if (type) {
        const losType = config.mappings.losType[type];
        return (
            <span style={{ color: losType.colour }}>{losType.text}</span>
        );
    }
}

export default { 
    format, 
    eda,
    speciesType
};