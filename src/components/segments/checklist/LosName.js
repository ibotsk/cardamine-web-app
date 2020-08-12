import React from 'react';

import PropTypes from 'prop-types';

import SpeciesPropType from '../../propTypes/species';

import { helper } from '../../../utils';

const AnchorWrap = ({ value, uri }) => {
  if (!uri) {
    return value;
  }
  return (
    <a href={uri}>
      {value}
    </a>
  );
};

const LosName = ({
  data, format = 'plain', isPublication, uri,
}) => {
  if (!data) {
    return '';
  }

  const losForComponent = helper.listOfSpeciesForComponent(data, format, {
    isPublication,
  // eslint-disable-next-line react/no-array-index-key
  }).map((e, i) => <span key={i}>{e}</span>);

  return (
    <AnchorWrap value={losForComponent} uri={uri} />
  );
};

export default LosName;

LosName.propTypes = {
  data: SpeciesPropType.type,
  format: PropTypes.string,
  isPublication: PropTypes.bool,
  uri: PropTypes.string,
};

LosName.defaultProps = {
  data: undefined,
  format: 'plain',
  isPublication: false,
  uri: undefined,
};

AnchorWrap.propTypes = {
  value: PropTypes.arrayOf(PropTypes.element).isRequired,
  uri: PropTypes.string,
};

AnchorWrap.defaultProps = {
  uri: undefined,
};
