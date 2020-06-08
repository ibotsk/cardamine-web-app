import React from 'react';

import {
  Col, Row, Panel, Button,
  Form, FormGroup, FormControl, ControlLabel,
  Radio,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

const makeOptions = (list) => {
  const options = list.map((e) => (
    <option key={e} value={e}>{e}</option>
  ));
  const defaultOption = <option key="null">-</option>;
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
      nameSearchType: '1',
      publicationAuthor: '',
      analysisAuthor: '',
      worldL1: '',
      worldL2: '',
      worldL3: '',
      worldL4: '',
      latitudeDegrees: '',
      longitudeDegrees: '',
      range: '',

      xRevisedOptions: [],
      ploidyLevelRevisedOptions: [],
      brummit1Options: [],
      brummit2Options: [],
      brummit3Options: [],
      brummit4Options: [],
    };
  }

  componentDidMount() {
    // fetch from db
    this.setState({
      xRevisedOptions: ['7', '8', '11'],
      ploidyLevelRevisedOptions: ['2x', '3x', '4x'],
      brummit1Options: ['A', 'B'],
      brummit2Options: ['a', 'b'],
      brummit3Options: ['X', 'Y'],
      brummit4Options: ['x', 'y'],
    });
  }

  handleChangeTextInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleRadioChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();

    const { onFilter } = this.props;
    const {
      xRevisedOptions, ploidyLevelRevisedOptions,
      brummit1Options, brummit2Options, brummit3Options, brummit4Options,
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

      xRevisedOptions, ploidyLevelRevisedOptions,
      brummit1Options, brummit2Options, brummit3Options, brummit4Options,
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
              <FormGroup controlId="baseChromNumber" bsSize="sm">
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
              <FormGroup controlId="ploidyLevel" bsSize="sm">
                <ControlLabel>
                  Ploidy level (revised):
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  value={ploidyLevelRevised}
                  onChange={this.handleChangeTextInput}
                >
                  {
                    makeOptions(ploidyLevelRevisedOptions)
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
                  value="1"
                  checked={nameSearchType === '1'}
                  onChange={this.handleRadioChange}
                >
                  Identification based on last revision
                </Radio>
                <Radio
                  name="nameSearchType"
                  value="2"
                  checked={nameSearchType === '2'}
                  onChange={this.handleRadioChange}
                >
                  Identification in the original publication
                </Radio>
                <Radio
                  name="nameSearchType"
                  value="3"
                  checked={nameSearchType === '3'}
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
                  type="text"
                  value={publicationAuthor}
                  onChange={this.handleChangeTextInput}
                  placeholder="Publication (co-)author"
                />
              </FormGroup>
              <FormGroup controlId="analysisAuthor" bsSize="sm">
                <ControlLabel>
                  Analysis (co-)author:
                </ControlLabel>
                <FormControl
                  type="text"
                  value={analysisAuthor}
                  onChange={this.handleChangeTextInput}
                  placeholder="Analysis (co-)author"
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <h4>Location search:</h4>
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
                    makeOptions(brummit1Options)
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
                    makeOptions(brummit2Options)
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
                    makeOptions(brummit3Options)
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
                    makeOptions(brummit4Options)
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
