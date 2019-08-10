import React from 'react';
import { helper } from '../../utils';

const LosName = ({ data, format = 'plain', isPublication }) => {

    const name = data;
    if (!name) {
        return '';
    }

    return helper.listOfSpeciesForComponent(name, format, { isPublication }).map((e, i) => <span key={i}>{e}</span>);
}

export default LosName;