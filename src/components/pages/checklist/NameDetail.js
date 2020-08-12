import React from 'react';
import { Grid, Panel, Well } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ListBlock from '../../segments/checklist/ListBlock';
import LosName from '../../segments/checklist/LosName';
import NameBlock from '../../segments/checklist/NameBlock';
import Publication from '../../segments/checklist/Publication';
import Synonyms from '../../segments/checklist/Synonyms';
import Typification from '../../segments/checklist/Typification';

import { checklist as checklistFacade } from '../../../facades';
import {
  formatter,
  utils as otherUtils,
} from '../../../utils';

const ACCEPTED_TYPE = 'A';

const isAccepted = (species) => species.ntype === ACCEPTED_TYPE;

class NameDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      species: {},
      accepted: {},
      basionym: {},
      replaced: {},
      nomenNovum: {},
      nomenclatoricSynonyms: [],
      taxonomicSynonyms: [],
      invalidDesignations: [],
      misidentifications: [],
      basionymFor: [],
      replacedFor: [],
      nomenNovumFor: [],
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const species = await checklistFacade.getSpeciesById(id);
    const {
      nomenclatoricSynonyms,
      taxonomicSynonyms,
      invalidDesignations,
      misidentifications,
    } = await checklistFacade.getSynonyms(id);

    const {
      basionymFor, replacedFor, nomenNovumFor,
    } = await checklistFacade.getFors(id);

    const {
      basionym, replaced, nomenNovum,
    } = await checklistFacade.getBasionymReplacedNovumOf(id);

    const accepted = await checklistFacade.getAcceptedOf(id);

    this.setState({
      species,
      accepted,
      basionym,
      replaced,
      nomenNovum,
      nomenclatoricSynonyms,
      taxonomicSynonyms,
      invalidDesignations,
      misidentifications,
      basionymFor,
      replacedFor,
      nomenNovumFor,
    });
  }

  render() {
    const {
      species, accepted,
      basionym, replaced, nomenNovum,
      nomenclatoricSynonyms, taxonomicSynonyms, invalidDesignations,
      misidentifications,
      basionymFor, replacedFor, nomenNovumFor,
    } = this.state;

    return (
      <Grid id="species-detail">
        <Well id="name">
          <h3>
            <LosName data={species} format="italic" />
          </h3>
          <h4>
            {formatter.speciesType(species.ntype)}
          </h4>
        </Well>
        <Panel id="species-detail-publication">
          <Panel.Body>
            <Publication publication={species.publication} />
          </Panel.Body>
        </Panel>

        <Panel id="species-detail-brn">
          <Panel.Body>
            <NameBlock
              id="basionym"
              label="Basionym:"
              data={basionym}
              isPublication
              format="italic"
              uri={otherUtils.getSpeciesDetailUri(basionym.id)}
              defaultValue="-"
            />
            <NameBlock
              id="replaced"
              label="Replaced:"
              data={replaced}
              isPublication
              format="italic"
              uri={otherUtils.getSpeciesDetailUri(replaced.id)}
              defaultValue="-"
            />
            <NameBlock
              id="nomen-novum"
              label="Nomen novum:"
              data={nomenNovum}
              isPublication
              format="italic"
              uri={otherUtils.getSpeciesDetailUri(nomenNovum.id)}
              defaultValue="-"
            />
          </Panel.Body>
        </Panel>

        {
          isAccepted(species) && (
            <Synonyms
              label="Synonyms:"
              nomenclatoric={nomenclatoricSynonyms}
              taxonomic={taxonomicSynonyms}
              invalidDesignations={invalidDesignations}
              misidentifications={misidentifications}
            />
          )
        }

        {
          accepted.id && (
            <Panel id="specied-detail-accepted">
              <Panel.Body>
                <NameBlock
                  label="Accepted name:"
                  data={accepted}
                  isPublication
                  format="italic"
                  uri={otherUtils.getSpeciesDetailUri(accepted.id)}
                />
              </Panel.Body>
            </Panel>
          )
        }

        <Panel id="species-detail-fors">
          <Panel.Body>
            <ListBlock
              id="basionym-for"
              label="Basionym for:"
              data={basionymFor}
              defaultValue="-"
            />
            <ListBlock
              id="replaced-for"
              label="Replaced for:"
              data={replacedFor}
              defaultValue="-"
            />
            <ListBlock
              id="nomen-novum-for"
              label="Nomen novum for:"
              data={nomenNovumFor}
              defaultValue="-"
            />
          </Panel.Body>
        </Panel>

        <Typification
          id="species-detail-typification"
          species={species}
        />
      </Grid>
    );
  }
}

export default NameDetail;

NameDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
