import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import TableRow from '../TableRow';

const Material = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '50%' }} />
      <col span="1" style={{ width: '30%' }} />
    </colgroup>
    <tbody>
      <TableRow
        label="Collected by:"
        value={data.collectedBy ? data.collectedBy.persName : undefined}
      />
      <TableRow
        label="Date:"
        value={data.collectedDate}
      />
      <TableRow
        label="Identified by:"
        value={data.identifiedBy
          ? data.identifiedBy.persName
          : undefined}
      />
      <TableRow
        label="Voucher:"
        value={data.voucherSpecimenNo}
      />
      <TableRow
        label="Voucher deposited in:"
        value={data.depositedIn}
      />
    </tbody>
  </Table>
);

export default Material;

Material.propTypes = {
  data: PropTypes.shape({
    collectedDate: PropTypes.string,
    voucherSpecimenNo: PropTypes.string,
    depositedIn: PropTypes.string,
    collectedBy: PropTypes.shape({
      persName: PropTypes.string,
    }),
    identifiedBy: PropTypes.shape({
      persName: PropTypes.string,
    }),
  }).isRequired,
};
