import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

import PropTypes from 'prop-types';

const STATE_OPENED = 'Hide filter';
const STATE_CLOSED = 'Show filter';

const ToggleText = ({ open }) => {
  if (open) {
    return (
      <>
        {STATE_OPENED}
        {' '}
        <Glyphicon glyph="chevron-up" />
      </>
    );
  }
  return (
    <>
      {STATE_CLOSED}
      {' '}
      <Glyphicon glyph="chevron-down" />
    </>
  );
};

const FilterToggleWrapper = ({
  id, open, onToggle, children,
}) => (
  <Panel id={id} expanded={open} onToggle={onToggle}>
    <Panel.Heading className="text-center filter-heading">
      <Panel.Toggle componentClass="a">
        <ToggleText open={open} />
      </Panel.Toggle>
    </Panel.Heading>
    <Panel.Collapse>
      {children}
    </Panel.Collapse>
  </Panel>
);

export default FilterToggleWrapper;

FilterToggleWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

FilterToggleWrapper.defaultProps = {
  children: undefined,
};

ToggleText.propTypes = {
  open: PropTypes.bool.isRequired,
};
