import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LabelValue from '../../segments/LabelValue';
import LosName from '../../segments/LosName';

import { utils } from '../../../utils';
import config from '../../../config';

const BASIONYM_LABEL = "Basionym:";

const Basionym = ({ basionym }) => {

    if (utils.isEmptyObj(basionym)) {
        return null;
    }
    return (
        <div id="basionym">
            <Row className="dblock">
                <Col xs={12}>
                    <LabelValue label={BASIONYM_LABEL} value={<LosName data={basionym} uri={`${config.routes.checklist}/${basionym.id}`} />} />
                </Col>
            </Row>
        </div>
    );

}

export default Basionym;