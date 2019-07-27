import React from 'react';

const MISSING_VALUE = "-";

const LabelValue = ({ label, value }) => {

    return (
        <React.Fragment>
            <span className="dlabel">{label}</span>
            <span>{value || MISSING_VALUE}</span>
        </React.Fragment>
    );

}

export default LabelValue;