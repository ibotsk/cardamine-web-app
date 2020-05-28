import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

import PropTypes from 'prop-types';

const STATE_OPENED = 'Hide filter';
const STATE_CLOSED = 'Show filter';

class FilterToggleWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true,
    };
  }

  onToggle() {
    this.setState((state) => ({
      isOpened: !state.isOpened,
    }));
  }

  toggleText() {
    const { isOpened } = this.state;
    if (isOpened) {
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
  }

  render() {
    const { id, children } = this.props;
    const { isOpened } = this.state;
    return (
      <Panel id={id} expanded={isOpened} onToggle={() => this.onToggle()}>
        <Panel.Heading className="text-center filter-heading">
          <Panel.Toggle componentClass="a">{this.toggleText()}</Panel.Toggle>
        </Panel.Heading>
        <Panel.Collapse>
          {children}
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default FilterToggleWrapper;

FilterToggleWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element,
};

FilterToggleWrapper.defaultProps = {
  children: undefined,
};
