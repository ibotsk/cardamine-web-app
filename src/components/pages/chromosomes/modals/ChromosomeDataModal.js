import React from 'react';

import {
  Modal,
  Tabs, Tab,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import ChromosomeRecodsList from './ChromosomeRecordsList';
import ChromosomeRecordsMap from './ChromosomeRecordsMap';

import { chromosomes as chromosomesFacade } from '../../../../facades';

class ChromosomeDataModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizePerPage: 20,
      page: 1,
      records: [],
    };
  }

  onEnter = async () => {
    const { ids, onHide } = this.props;
    const { sizePerPage } = this.state;

    if (ids && ids.length > 0) {
      const records = await chromosomesFacade.getAllByIds(ids, 0, sizePerPage);
      this.setState({
        records,
      });
    } else {
      onHide();
    }
  }

  handleTableChange = async (type, { page, sizePerPage }) => {
    const offset = (page - 1) * sizePerPage;
    const { ids } = this.props;
    const records = await chromosomesFacade.getAllByIds(
      ids,
      offset,
      sizePerPage,
    );

    this.setState({
      records,
      page,
      sizePerPage,
    });
  }

  render() {
    const { show, onHide, ids } = this.props;
    const { records, sizePerPage, page } = this.state;
    const totalSize = ids.length;

    return (
      <Modal
        bsSize="large"
        show={show}
        onEnter={this.onEnter}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Title
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Tabs defaultActiveKey={1} id="records-tabs">
            <Tab eventKey={1} title="Records">
              <ChromosomeRecodsList
                data={records}
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                onTableChange={this.handleTableChange}
              />
            </Tab>
            <Tab eventKey={2} title="Map">
              <ChromosomeRecordsMap />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChromosomeDataModal;

ChromosomeDataModal.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
