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
  );
};

const LosName = ({
  data, format = 'plain', isPublication, uri,
}) => {
  const name = data;
  if (!name) {
    return '';
  }

  const losForComponent = helper.listOfSpeciesForComponent(name, format, {
    isPublication,
  // eslint-disable-next-line react/no-array-index-key
  }).map((e, i) => <span key={i}>{e}</span>);

  return anchorWrap(losForComponent, uri);
};

export default LosName;
