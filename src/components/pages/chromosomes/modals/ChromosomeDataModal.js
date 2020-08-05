import React from 'react';

import { Modal } from 'react-bootstrap';

class ChromosomeDataModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  onEnter = async () => {
    const { ids, onHide } = this.props;
    if (ids) {
      console.log(ids);
    } else {
      onHide();
    }
  }

  render() {
    const { show, onHide, ids } = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            Title
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {JSON.stringify(ids)}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChromosomeDataModal;
