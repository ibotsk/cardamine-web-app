import React from 'react';
import { Grid, Well } from 'react-bootstrap';

import LosName from '../segments/LosName';
import Publication from './Checklist/Publication';
import Synonyms from './Checklist/Synonyms';

import { checklist as checklistFacade } from '../../facades';
import { formatter } from '../../utils';
import Basionym from './Checklist/Basionym';

const ACCEPTED_TYPE = 'A';

const isAccepted = (species) => {
    return species.ntype === ACCEPTED_TYPE;
}

class NameDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            species: {},
            basionym: {},
            nomenclatoricSynonyms: [],
            taxonomicSynonyms: [],
            invalidDesignations: []
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const species = await checklistFacade.getSpeciesById(id);
        const { nomenclatoricSynonyms, taxonomicSynonyms, invalidDesignations } = await checklistFacade.getSynonyms(id);
        const basionym = await checklistFacade.getBasionymOf(id);
        this.setState({
            species,
            basionym,
            nomenclatoricSynonyms,
            taxonomicSynonyms,
            invalidDesignations
        });
    }

    render() {
        console.log(this.state);
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

                <Basionym basionym={this.state.basionym} />
                <Synonyms
                    isLabel={isAccepted(species)}
                    nomenclatoric={this.state.nomenclatoricSynonyms}
                    taxonomic={this.state.taxonomicSynonyms}
                    invalidDesignations={this.state.invalidDesignations}
                />
            </Grid>
        );
    }

}

export default NameDetail;