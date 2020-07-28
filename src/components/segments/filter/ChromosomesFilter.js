import React from 'react';

import {
  Col, Row, Panel, Button,
  Form, FormGroup, FormControl, ControlLabel,
  Radio,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import {
  literature as literatureFacade,
  persons as personsFacade,
  worlds as worldsFacade,
} from '../../../facades';

import {
  xRevisedOptions,
  ploidyRevisedOptions,
  chromosomesSearchType as cst,
} from '../../../config/constants';

const makeOptions = (list) => {
  const options = list.map(({ value, label }) => (
    <option key={value} value={value}>{label}</option>
  ));
  const defaultOption = <option key="null" value="">-</option>;
  return [defaultOption, ...options];
};

class ChromosomesFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      n: '',
      dn: '',
      xRevised: '',
      ploidyLevelRevised: '',
      genus: '',
      species: '',
      infraspecific: '',
      nameSearchType: cst.lastRevision,
      publicationAuthor: '',
      analysisAuthor: '',
      worldL1: '',
      worldL2: '',
      worldL3: '',
      worldL4: '',
      latitudeDegrees: '',
      longitudeDegrees: '',
      range: '',

      publicationAuthorOptions: [],
      analysisAuthorOptions: [],
      worldL1Options: [],
      worldL2Options: [],
      worldL3Options: [],
      worldL4Options: [],
    };
  }

  async componentDidMount() {
    // fetch from db
    const analysisAuthorOptions = await personsFacade.getAllPersons(
      ({ id, persName }) => (
        { value: id, label: persName }
      ),
    );
    const publicationAuthorOptions = await literatureFacade.getAllPaperAuthors(
      (a) => (
        { value: a, label: a }
      ),
    );

    const {
      worldsL1, worldsL2, worldsL3, worldsL4,
    } = await worldsFacade.getAllWorlds(({ id, description }) => (
      { value: id, label: description }
    ));

    this.setState({
      analysisAuthorOptions,
      publicationAuthorOptions,
      worldL1Options: worldsL1,
      worldL2Options: worldsL2,
      worldL3Options: worldsL3,
      worldL4Options: worldsL4,
    });
  }

  handleChangeTextInput = (e) => (
    this.setState({ [e.target.id]: e.target.value })
  );

  handleRadioChange = (e) => (
    this.setState({ [e.target.name]: e.target.value })
  );

  submitForm = (e) => {
    e.preventDefault();

    const { onFilter } = this.props;
    // exclude options from filter props
    const {
      analysisAuthorOptions, publicationAuthorOptions,
      worldL1Options, worldL2Options, worldL3Options, worldL4Options,
      ...relevant
    } = this.state;

    onFilter(relevant);
  };

  render() {
    const {
      n, dn, xRevised, ploidyLevelRevised,
      genus, species, infraspecific, nameSearchType,
      publicationAuthor, analysisAuthor,
      worldL1, worldL2, worldL3, worldL4,
      latitudeDegrees, longitudeDegrees, range,

      analysisAuthorOptions, publicationAuthorOptions,
      worldL1Options, worldL2Options, worldL3Options, worldL4Options,
    } = this.state;

    return (
      <Panel.Body>
        <Form onSubmit={this.submitForm}>
          <Row>
            <Col md={4}>
              <h4>Chromosome/ploidy search:</h4>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup controlId="n" bsSize="sm">
                <ControlLabel>
                  Meiotic (gametophytic) chromosome counts (n):
                </ControlLabel>
                <FormControl
                  type="text"
                  value={n}
                  onChange={this.handleChangeTextInput}
                  placeholder="Meiotic (gametophytic) chromosome counts (n)"
                />
              </FormGroup>
              <FormGroup controlId="dn" bsSize="sm">
                <ControlLabel>
                  Mitotic (sporophytic) chromosome counts (2n):
                </ControlLabel>
                <FormControl
                  type="text"
                  value={dn}
                  onChange={this.handleChangeTextInput}
                  placeholder="Mitotic (sporophytic) chromosome counts (2n)"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup controlId="xRevised" bsSize="sm">
                <ControlLabel>
                  Base chromosome number (revised):
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={xRevised}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(xRevisedOptions)
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="ploidyLevelRevised" bsSize="sm">
                <ControlLabel>
                  Ploidy level (revised):
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={ploidyLevelRevised}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(ploidyRevisedOptions)
                  }
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <h4>Name search:</h4>
              <FormGroup controlId="genus" bsSize="sm">
                <ControlLabel>
                  Genus:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={genus}
                  onChange={this.handleChangeTextInput}
                  placeholder="Genus"
                />
              </FormGroup>
              <FormGroup controlId="species" bsSize="sm">
                <ControlLabel>
                  Species:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={species}
                  onChange={this.handleChangeTextInput}
                  placeholder="Species"
                />
              </FormGroup>
              <FormGroup controlId="infraspecific" bsSize="sm">
                <ControlLabel>
                  Infraspecific epithet:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={infraspecific}
                  onChange={this.handleChangeTextInput}
                  placeholder="nfraspecific epithet"
                />
              </FormGroup>
              <FormGroup controlId="nameSearchType">
                <Radio
                  name="nameSearchType"
                  value={cst.lastRevision}
                  checked={nameSearchType === cst.lastRevision}
                  onChange={this.handleRadioChange}
                >
                  Identification based on last revision
                </Radio>
                <Radio
                  name="nameSearchType"
                  value={cst.originalIdentification}
                  checked={nameSearchType === cst.originalIdentification}
                  onChange={this.handleRadioChange}
                >
                  Identification in the original publication
                </Radio>
                <Radio
                  name="nameSearchType"
                  value={cst.all}
                  checked={nameSearchType === cst.all}
                  onChange={this.handleRadioChange}
                >
                  All identifications and corresponding
                  {' '}
                  accepted names or synonyms
                </Radio>
              </FormGroup>
            </Col>
            <Col md={3}>
              <h4>Author search:</h4>
              <FormGroup controlId="publicationAuthor" bsSize="sm">
                <ControlLabel>
                  Publication (co-)author:
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={publicationAuthor}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(publicationAuthorOptions)
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="analysisAuthor" bsSize="sm">
                <ControlLabel>
                  Analysis (co-)author:
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={analysisAuthor}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(analysisAuthorOptions)
                  }
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={3}>
              <h4>Location search:</h4>
              {
                // More specific level overrides the more general one
              }
              <FormGroup controlId="worldL1" bsSize="sm">
                <ControlLabel>
                  Level 1:
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={worldL1}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(worldL1Options)
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="worldL2" bsSize="sm">
                <ControlLabel>
                  Level 2:
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={worldL2}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(worldL2Options)
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="worldL3" bsSize="sm">
                <ControlLabel>
                  Level 3:
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={worldL3}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(worldL3Options)
                  }
                </FormControl>
              </FormGroup>
              <FormGroup controlId="worldL4" bsSize="sm">
                <ControlLabel>
                  Level 4 :
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={worldL4}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(worldL4Options)
                  }
                </FormControl>
              </FormGroup>
            </Col>

            <Col md={3}>
              <h4>Location according to geographical coordinates:</h4>
              <FormGroup controlId="latitudeDegrees" bsSize="sm">
                <ControlLabel>
                  Latitude in degrees:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={latitudeDegrees}
                  onChange={this.handleChangeTextInput}
                  placeholder="Latitude in degrees"
                />
              </FormGroup>
              <FormGroup controlId="longitudeDegrees" bsSize="sm">
                <ControlLabel>
                  Longitude in degrees:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={longitudeDegrees}
                  onChange={this.handleChangeTextInput}
                  placeholder="Longitude in degrees"
                />
              </FormGroup>
              <FormGroup controlId="range" bsSize="sm">
                <ControlLabel>
                  Range in degrees:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={range}
                  onChange={this.handleChangeTextInput}
                  placeholder="Range in degrees"
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="text-center">
            <Button bsStyle="primary" type="submit">Find</Button>
          </div>
        </Form>
      </Panel.Body>
    );
  }
}

export default ChromosomesFilter;

ChromosomesFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
