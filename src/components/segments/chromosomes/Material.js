import React from 'react';

import { Table } from 'react-bootstrap';

import PropTypes from 'prop-types';

import CTableRow from './CTableRow';

const Material = ({ data }) => (
  <Table striped condensed responsive>
    <colgroup>
      <col span="1" style={{ width: '50%' }} />
      <col span="1" style={{ width: '30%' }} />
    </colgroup>
    <tbody>
      <CTableRow
        label="Collected by:"
        value={data['collected-by'] ? data['collected-by'].persName : undefined}
      />
      <CTableRow
        label="Date:"
        value={data.collectedDate}
      />
      <CTableRow
        label="Identified by:"
        value={data['identified-by']
          ? data['identified-by'].persName
          : undefined}
      />
      <CTableRow
        label="Voucher:"
        value={data.voucherSpecimenNo}
      />
      <CTableRow
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
    'collected-by': PropTypes.shape({
      persName: PropTypes.string,
    }),
    'identified-by': PropTypes.shape({
      persName: PropTypes.string,
    }),
  }).isRequired,
};
