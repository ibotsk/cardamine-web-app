import React from 'react';
import { Col, Grid, Row, Well } from 'react-bootstrap';

import LosName from '../segments/LosName';
import Publication from './Checklist/Publication';
import Synonyms from './Checklist/Synonyms';

import { checklist as checklistFacade } from '../../facades';
import { formatter } from '../../utils';

class NameDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            species: {}
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const species = await checklistFacade.getSpeciesById(id);
        this.setState({
            species
        });
    }

    render() {
        console.log(this.state);
        const species = this.state.species;
        return (
            <Grid>
                <Well id="name">
                    <h3>
                        <LosName data={species} format="italic" />
                    </h3>
                    <h4>
                        {formatter.speciesType(species.ntype)}
                    </h4>
                </Well>
                
                <Row className="dblock">
                    <Col xs={12}>
                        <Publication publication={species.publication} />
                    </Col>
                </Row>
                <Row className="dblock">
                    <Col xs={12}>
                        <Synonyms />
                    </Col>
                </Row>
            </Grid>
        );
    }

}

export default NameDetail;