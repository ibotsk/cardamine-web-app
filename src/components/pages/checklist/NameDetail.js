import React from 'react';
import { Grid, Well } from 'react-bootstrap';

import PropTypes from 'prop-types';

import LosName from '../../segments/checklist/LosName';
import Publication from '../../segments/checklist/Publication';
import Synonyms from '../../segments/checklist/Synonyms';
import NameBlock from '../../segments/checklist/NameBlock';
import ListBlock from '../../segments/checklist/ListBlock';

import facades from '../../../facades';
import { formatter } from '../../../utils';

const { checklist: checklistFacade } = facades;
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

    const basionym = await checklistFacade.getBasionymOf(id);
    const accepted = await checklistFacade.getAcceptedOf(id);

    this.setState({
      species,
      basionym,
      accepted,
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
      species,
      basionym, replaced, accepted,
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

        <Publication publication={species.publication} />

        <NameBlock id="basionym" label="Basionym:" data={basionym} />
        <NameBlock id="replaced" label="Replaced:" data={replaced} />

        <Synonyms
          label={isAccepted(species) ? 'Synonyms:' : undefined}
          nomenclatoric={nomenclatoricSynonyms}
          taxonomic={taxonomicSynonyms}
          invalidDesignations={invalidDesignations}
          misidentifications={misidentifications}
        />

        <NameBlock
          id="accepted-name"
          label="Accepted name:"
          data={accepted}
        />

        <ListBlock
          id="basionym-for"
          label="Basionym for:"
          data={basionymFor}
        />
        <ListBlock
          id="replaced-for"
          label="Replaced for:"
          data={replacedFor}
        />
        <ListBlock
          id="nomen-novum-for"
          label="Nomen novum for:"
          data={nomenNovumFor}
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
