import React from 'react';
import { helper } from '../../utils';

const anchorWrap = (value, uri) => {
    if (!uri) {
        return value;
    }
    return (
        <a href={uri}>
            {value}
        </a>
    )
}

const LosName = ({ data, format = 'plain', isPublication, uri }) => {

    const name = data;
    if (!name) {
        return '';
    }

    return anchorWrap(helper.listOfSpeciesForComponent(name, format, { isPublication }).map((e, i) => <span key={i}>{e}</span>), uri);
}

export default LosName;