import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

const STATE_OPENED = 'Hide filter';
const STATE_CLOSED = 'Show filter';

class FilterToggleWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: true,
    };
  }

  toggleText() {
    if (this.state.isOpened) {
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

  onToggle() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  render() {
    return (
      <Panel id={this.props.id} expanded={this.state.isOpened} onToggle={() => this.onToggle()}>
        <Panel.Heading className="text-center filter-heading">
          <Panel.Toggle componentClass="a">{this.toggleText()}</Panel.Toggle>
        </Panel.Heading>
        <Panel.Collapse>
          {this.props.children}
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default FilterToggleWrapper;
