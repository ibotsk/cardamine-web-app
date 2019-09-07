import React from 'react';
import { Col, Row } from 'react-bootstrap';

import LosName from '../../segments/LosName';

import config from '../../../config';

const SynList = ({ list, className, sublistProp, sublistClass }) => {
    return (
        <ul>
            {list.map(s => {
                const sublist = sublistProp ? s[sublistProp] : null;
                return (
                    <li key={s.id} className={className}>
                        <span>
                            <LosName data={s} format="italic" isPublication={true} uri={`${config.routes.checklist}/${s.id}`} />
                            {
                                sublist && sublist.length > 0 &&
                                <SynList list={sublist} className={sublistClass} />
                            }
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

const Synonyms = ({ nomenclatoric, taxonomic, isLabel = true }) => {

    return (
        <div id="synonyms" className="dblock">
            <div>
                {
                    isLabel &&
                    <b>Synonyms:</b>
                }
                <Row>
                    <Col xs={12}>
                        {nomenclatoric && nomenclatoric.length > 0 &&
                            <SynList list={nomenclatoric} className={config.mappings.synonym.nomenclatoric.className} />
                        }
                        {taxonomic && taxonomic.length > 0 &&
                            <SynList
                                list={taxonomic}
                                className={config.mappings.synonym.taxonomic.className}
                                sublistProp="synonyms-nomenclatoric"
                                sublistClass={config.mappings.synonym.nomenclatoric.className}
                            />
                        }
                    </Col>
                </Row>
            </div>
        </div>
    );

}

export default Synonyms;