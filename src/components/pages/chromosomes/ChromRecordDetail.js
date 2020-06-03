import React from 'react';

import { Grid, Panel, Well } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ChromosomeNumberDetail
  from '../../segments/chromosomes/ChromosomeNumberDetail';

import { chromosomes as chromosomesFacade } from '../../../facades';

class ChromRecordDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: {},
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const record = await chromosomesFacade.getRecordById(id);

    this.setState({
      record,
    });
  }

  render() {
    const { record } = this.state;

    console.log(record);

    return (
      <Grid>
        <Well className="text-center">
          <h1><i>Last revised name</i></h1>
        </Well>
        <Panel id="map" style={{ height: '50px' }}>
          Map
        </Panel>

        <h4>Chromosome number</h4>
        <Panel>
          <Panel.Body>
            <ChromosomeNumberDetail data={record} />
          </Panel.Body>
        </Panel>

        <h4>Estimated ploidy level and/or DNA content</h4>
        <Panel>
          <Panel.Body>
            ...
          </Panel.Body>
        </Panel>

        <h4>Locality</h4>
        <Panel>
          <Panel.Body>
            ...
          </Panel.Body>
        </Panel>

        <h4>Material</h4>
        <Panel>
          <Panel.Body>
            ...
          </Panel.Body>
        </Panel>

        <h4>Reference</h4>
        <Panel>
          <Panel.Body>
            ...
          </Panel.Body>
        </Panel>
      </Grid>
    );
  }
}

export default ChromRecordDetail;

ChromRecordDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
