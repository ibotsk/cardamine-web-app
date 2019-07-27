import React from 'react';
import { helper } from '../../utils';

const LosName = props => {

    const name = props.data;
    if (!name) {
        return '';
    }

    const format = props.format || 'plain';

    return helper.listOfSpeciesForComponent(name, format).map((e, i) => <span key={i}>{e}</span>);
}

export default LosName;