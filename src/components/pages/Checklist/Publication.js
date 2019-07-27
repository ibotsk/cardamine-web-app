import React from 'react';
import LabelValue from '../../segments/LabelValue';

const PUBLICATION_MISSING = "Not provided";
const PUBLICATION_LABEL = "Published in:";

const Publication = ({ publication }) => {

    return (
        <div id="publication">
            <LabelValue label={PUBLICATION_LABEL} value={publication || PUBLICATION_MISSING} />
        </div>
    );

}

export default Publication;