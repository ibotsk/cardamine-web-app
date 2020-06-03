import React from 'react';

import { Grid, Panel, Well } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ChromosomeNumberDetail
  from '../../segments/chromosomes/ChromosomeNumberDetail';

import { chromosomes as chromosomesFacade } from '../../../facades';
import DNAContent from '../../segments/chromosomes/DNAContent';
import Locality from '../../segments/chromosomes/Locality';
import Material from '../../segments/chromosomes/Material';
import Reference from '../../segments/chromosomes/Reference';

class ChromRecordDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: {},
      dna: {},
      material: {},
      reference: {},
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const {
      record, dna, material, reference,
    } = await chromosomesFacade.getRecordById(id);

    this.setState({
      record,
      dna,
      material,
      reference,
    });
  }

  render() {
    const {
      record, dna, material, reference,
    } = this.state;

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
            <DNAContent data={dna} />
          </Panel.Body>
        </Panel>

        <h4>Locality</h4>
        <Panel>
          <Panel.Body>
            <Locality data={material} />
          </Panel.Body>
        </Panel>

        <h4>Material</h4>
        <Panel>
          <Panel.Body>
            <Material data={material} />
          </Panel.Body>
        </Panel>

        <h4>Reference</h4>
        <Panel>
          <Panel.Body>
            <Reference data={reference} />
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
