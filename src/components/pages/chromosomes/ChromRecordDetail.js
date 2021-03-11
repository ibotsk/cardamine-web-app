import React from 'react';

import {
  Grid, Panel, Well,
  Image,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import ChromosomeNumberDetail
  from '../../segments/chromosomes/ChromosomeNumberDetail';

import { chromosomes as chromosomesFacade } from '../../../facades';
import DNAContent from '../../segments/chromosomes/DNAContent';
import Locality from '../../segments/chromosomes/Locality';
import Material from '../../segments/chromosomes/Material';
import Reference from '../../segments/chromosomes/Reference';
import OpenLayersMap from '../../segments/chromosomes/OpenLayersMap';
import LosName from '../../segments/checklist/LosName';

import { utils as otherUtils } from '../../../utils';

const markers = (latDec, lonDec) => {
  if (!latDec || !lonDec) {
    return undefined;
  }
  return [{
    lat: latDec,
    lon: lonDec,
  }];
};

class ChromRecordDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: {},
      dna: {},
      material: {},
      reference: {},
      latestRevision: {},
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const {
      record, dna, material, reference, latestRevision,
    } = await chromosomesFacade.getRecordById(id);

    this.setState({
      record,
      dna,
      material,
      reference,
      latestRevision,
    });
  }

  render() {
    const {
      record, dna, material, reference, latestRevision,
    } = this.state;
    const latestRevisionLos = latestRevision.listOfSpecies || {};
    const latestRevisionPubl = latestRevisionLos.publication
      ? `, ${latestRevisionLos.publication}`
      : '';
    const originalIdentificationLos = reference.OriginalIdentification
      || {};

    const { coordinatesForMap } = material;
    let marker;

    if (coordinatesForMap) {
      const { coordinates: { lat, lon } } = coordinatesForMap;
      marker = markers(
        lat,
        lon,
      );
    }

    return (
      <div>
        <Grid>
          <Well className="text-center">
            <h1>
              <LosName
                data={latestRevisionLos}
                format="italic"
                uri={otherUtils.getSpeciesDetailUri(latestRevisionLos.id)}
              />
              <small>{latestRevisionPubl}</small>
            </h1>
            <h4 className="black-anchor">
              <small>
                Name as originally published (standardised version):
              </small>
              {' '}
              <LosName
                data={originalIdentificationLos}
                format="italic"
                isPublication
                uri={otherUtils
                  .getSpeciesDetailUri(originalIdentificationLos.id)}
              />
            </h4>
            <h4>
              <small>Name exactly as originally published:</small>
              {' '}
              {reference.nameAsPublished}
            </h4>
          </Well>
        </Grid>

        <OpenLayersMap markers={marker} />

        <Grid>
          <h4>
            <Image
              className="icon"
              src="/icons/chromosome.png"
            />
            Chromosome number
          </h4>
          <Panel>
            <Panel.Body>
              <ChromosomeNumberDetail data={record} />
            </Panel.Body>
          </Panel>

          <h4>
            <Image
              className="icon"
              src="/icons/dna.png"
            />
            Estimated ploidy level and/or DNA content
          </h4>
          <Panel>
            <Panel.Body>
              <DNAContent data={dna} />
            </Panel.Body>
          </Panel>

          <h4>
            <Image
              className="icon"
              src="/icons/globe.png"
            />
            Locality
          </h4>
          <Panel>
            <Panel.Body>
              <Locality data={material} />
            </Panel.Body>
          </Panel>

          <h4>
            <Image
              className="icon"
              src="/icons/plant.png"
            />
            Material
          </h4>
          <Panel>
            <Panel.Body>
              <Material data={material} />
            </Panel.Body>
          </Panel>

          <h4>
            <Image
              className="icon"
              src="/icons/research.png"
            />
            Reference
          </h4>
          <Panel>
            <Panel.Body>
              <Reference data={reference} />
            </Panel.Body>
          </Panel>

          <div>
            Icons made by
            {' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            {' '}
            from
            {' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </Grid>
      </div>
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
