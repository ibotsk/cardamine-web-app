import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import TableRow from '../TableRow';

import { helper } from '../../../utils';

const Reference = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '30%' }} />
      <col span="1" style={{ width: '50%' }} />
    </colgroup>
    <tbody>
      <TableRow
        label="Publication:"
        value={data.literature
          ? helper.parsePublication(data.literature)
          : undefined}
      />
      <TableRow
        label="Exact page(s) on which the record is published:"
        value={data.page}
      />
      <TableRow
        label="Note:"
        value={data.note}
      />
    </tbody>
  </Table>
);

export default Reference;

Reference.propTypes = {
  data: PropTypes.shape({
    literature: PropTypes.shape({
      displayType: PropTypes.number,
      paperAuthor: PropTypes.string,
      paperTitle: PropTypes.string,
      seriesSource: PropTypes.string,
      volume: PropTypes.number,
      issue: PropTypes.string,
      publisher: PropTypes.string,
      editor: PropTypes.string,
      year: PropTypes.number,
      pages: PropTypes.string,
      journalName: PropTypes.string,
    }),
    page: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
};
