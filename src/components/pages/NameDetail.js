import React from 'react';
import { Grid, Well } from 'react-bootstrap';

import LosName from '../segments/LosName';
import Publication from './Checklist/Publication';
import Synonyms from './Checklist/Synonyms';
import NameBlock from './Checklist/NameBlock';
import ListBlock from './Checklist/ListBlock';

import { checklist as checklistFacade } from '../../facades';
import { formatter } from '../../utils';

const ACCEPTED_TYPE = 'A';

const isAccepted = (species) => {
    return species.ntype === ACCEPTED_TYPE;
}

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
            basionymFor: [],
            replacedFor: [],
            nomenNovumFor: []
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const species = await checklistFacade.getSpeciesById(id);
        const { nomenclatoricSynonyms, taxonomicSynonyms, invalidDesignations } = await checklistFacade.getSynonyms(id);
        const { basionymFor, replacedFor, nomenNovumFor } = await checklistFacade.getFors(id);
        const basionym = await checklistFacade.getBasionymOf(id);
        const accepted = await checklistFacade.getAcceptedOf(id);

        this.setState({
            species,
            basionym,
            accepted,
            nomenclatoricSynonyms,
            taxonomicSynonyms,
            invalidDesignations,
            basionymFor,
            replacedFor,
            nomenNovumFor
        });
    }

    render() {
        const species = this.state.species;
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

                <NameBlock id="basionym" label="Basionym:" data={this.state.basionym} />
                <NameBlock id="replaced" label="Replaced:" data={this.state.replaced} />

                <Synonyms
                    label={"Synonyms:"}
                    isLabel={isAccepted(species)}
                    nomenclatoric={this.state.nomenclatoricSynonyms}
                    taxonomic={this.state.taxonomicSynonyms}
                    invalidDesignations={this.state.invalidDesignations}
                />

                <NameBlock id="accepted-name" label="Accepted name:" data={this.state.accepted} />

                <ListBlock id="basionym-for" label="Basionym for:" data={this.state.basionymFor} />
                <ListBlock id="replaced-for" label="Replaced for:" data={this.state.replacedFor} />
                <ListBlock id="nomen-novum-for" label="Nomen novum for:" data={this.state.nomenNovumFor} />
            </Grid>
        );
    }

}

export default NameDetail;