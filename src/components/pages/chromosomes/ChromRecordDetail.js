import React from 'react';

import { Grid } from 'react-bootstrap';

import { chromosomes as chromosomesFacade } from '../../../facades';

class ChromRecordDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: {},
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;
    const record = await chromosomesFacade.getRecordById(id);

    this.setState({
      record,
    });
  }

  render() {
    const { record } = this.state;
    return (
      <Grid>
        <div>
          <pre>
            {JSON.stringify(record, null, 2)}
          </pre>
        </div>
      </Grid>
    );
  }
}

export default ChromRecordDetail;
