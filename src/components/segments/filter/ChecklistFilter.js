import React from 'react';
import {
  Row, Col, Panel,
  Form, FormGroup, FormControl, ControlLabel,
  Checkbox, Button,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import config from '../../../config';

const checkboxAll = 'All';
const allTypes = Object.keys(config.mappings.losType);

const handleCheckboxes = (value, list) => {
  if (value === checkboxAll) {
    return [checkboxAll];
  }
  const checkboxList = list.filter((c) => c !== checkboxAll);

  if (checkboxList.includes(value)) {
    if (checkboxList.length <= 1) {
      return [checkboxAll];
    }
    return checkboxList.filter((c) => c !== value);
  }

  checkboxList.push(value);
  return checkboxList;
};

class ChecklistFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genus: '',
      species: '',
      infraspecific: '',
      authors: '',
      typesSelected: [checkboxAll],
    };
  }

  onChangeTextInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onChangeCheckbox = (e) => {
    const { value } = e.target;
    this.setState((state) => {
      const { typesSelected } = state;
      const typesSelectedHandled = handleCheckboxes(value, typesSelected);
      return {
        typesSelected: typesSelectedHandled,
      };
    });
  }

  isChecked = (value) => {
    const { typesSelected } = this.state;
    return typesSelected.includes(value);
  }

  typeCheckboxes = () => (
    allTypes.map((type) => (
      <Checkbox
        key={type}
        name={type}
        value={type}
        onChange={(e) => this.onChangeCheckbox(e)}
        checked={this.isChecked(type)}
      >
        {config.mappings.losType[type].text}
      </Checkbox>
    ))
  );

  submitForm = (e) => {
    e.preventDefault();

    const { onFilter } = this.props;
    const { typesSelected, ...filterParams } = this.state;
    // ['All'] -> []
    const typesSelectedFiltered = typesSelected
      .filter((t) => t !== checkboxAll);

    onFilter({
      ...filterParams,
      typesSelected: typesSelectedFiltered,
    });
  }

  render() {
    const {
      genus, species, infraspecific, authors,
    } = this.state;
    return (
      <Panel.Body>
        <Form horizontal onSubmit={this.submitForm}>
          <Row>
            <Col md={4}>
              <h4>Name search: </h4>
              <FormGroup controlId="genus" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Genus:
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={genus}
                    onChange={this.onChangeTextInput}
                    placeholder="Genus"
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="species" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Species:
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={species}
                    onChange={this.onChangeTextInput}
                    placeholder="Species"
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="infraspecific" bsSize="sm">
                <Col componentClass={ControlLabel} md={3}>
                  Infraspecific epithet:
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    value={infraspecific}
                    onChange={this.onChangeTextInput}
                    placeholder="Infraspecific epithet"
                  />
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
                  <FormControl
                    type="text"
                    value={authors}
                    onChange={this.onChangeTextInput}
                    placeholder="Authors"
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md={4}>
              <Checkbox
                name={checkboxAll}
                value={checkboxAll}
                onChange={this.onChangeCheckbox}
                checked={this.isChecked(checkboxAll)}
              >
                All names
              </Checkbox>
              <div>or select individually:</div>
              {
                this.typeCheckboxes()
              }
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

export default ChecklistFilter;

ChecklistFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
