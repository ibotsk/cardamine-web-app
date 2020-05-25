import React from 'react';
import {
  Row, Col, Panel,
  Form, FormGroup, FormControl, ControlLabel,
  Checkbox, Button,
} from 'react-bootstrap';

import config from '../../../config';

const checkboxAll = 'All';
const allTypes = Object.keys(config.mappings.losType);

class ChecklistFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genus: undefined,
      species: undefined,
      infraspecific: undefined,
      authors: undefined,
      typesSelected: [checkboxAll],
    };
  }

  onChangeTextInput(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onChangeCheckbox(e) {
    const { value } = e.target;
    const typesSelected = handleCheckboxes(value, this.state.typesSelected);
    console.log(typesSelected);


    this.setState({
      typesSelected,
    });
  }

  isChecked(value) {
    return this.state.typesSelected.includes(value);
  }

  typeCheckboxes() {
    return allTypes.map((type) => (
      <Checkbox key={type} name={type} value={type} onChange={(e) => this.onChangeCheckbox(e)} checked={this.isChecked(type)}>
        {config.mappings.losType[type].text}
      </Checkbox>
    ));
  }

  submitForm(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (

      <Panel.Body>
        <Form horizontal onSubmit={(e) => this.submitForm(e)}>
          <Row>
            <Col md={4}>
              <h4>Name search: </h4>
              <FormGroup controlId="genus" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Genus:
                </Col>
                <Col md={9}>
                  <FormControl type="text" value={this.state.genus} onChange={(e) => this.onChangeTextInput(e)} placeholder="Genus" />
                </Col>
              </FormGroup>
              <FormGroup controlId="species" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Species:
                </Col>
                <Col md={9}>
                  <FormControl type="text" value={this.state.species} onChange={(e) => this.onChangeTextInput(e)} placeholder="Specied" />
                </Col>
              </FormGroup>
              <FormGroup controlId="infraspecific" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Infraspecific epithet:
                </Col>
                <Col md={9}>
                  <FormControl type="text" value={this.state.infraspecific} onChange={(e) => this.onChangeTextInput(e)} placeholder="Infraspecific epithet" />
                </Col>
              </FormGroup>
            </Col>
            <Col md={4}>
              <h4>Author search: </h4>
              <FormGroup controlId="authors" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Authors:
                </Col>
                <Col md={9}>
                  <FormControl type="text" value={this.state.authors} onChange={(e) => this.onChangeTextInput(e)} placeholder="Authors" />
                </Col>
              </FormGroup>
            </Col>
            <Col md={4}>
              <Checkbox name={checkboxAll} value={checkboxAll} onChange={(e) => this.onChangeCheckbox(e)} checked={this.isChecked(checkboxAll)}>
                All names
              </Checkbox>
              <div>or (multiple choices possible):</div>
              {
                                this.typeCheckboxes()
                            }
            </Col>
          </Row>
          <div className="text-center">
            <Button bsStyle="default" type="submit">Find</Button>
          </div>
        </Form>
      </Panel.Body>
    );
  }
}

export default ChecklistFilter;

function handleCheckboxes(value, list) {
  let checkedList = [...list];
  if (value === checkboxAll) {
    if (list.includes(value)) {
      checkedList = [...allTypes]; // uncheck 'All' -> check others
    } else {
      checkedList = [value]; // check 'All' -> uncheck others
    }
  } else {
    if (list.includes(checkboxAll)) { // check any other -> unchec 'All'
      checkedList = [];
    }
    checkedList.push(value);
  }
  return checkedList;
}
