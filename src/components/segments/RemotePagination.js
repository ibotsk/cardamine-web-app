import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory,
{
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from 'react-bootstrap-table2-paginator';

import PropTypes from 'prop-types';

import config from '../../config';

const { pagination: paginationConfig } = config;

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing
    {' '}
    {from}
    {' '}
    to
    {' '}
    {to}
    {' '}
    of
    {' '}
    {size}
    {' '}
    Results
  </span>
);

const RemotePagination = ({
  id,
  keyField,
  data,
  columns,
  page,
  sizePerPage,
  totalSize,
  onTableChange,
}) => (
  <div>
    <PaginationProvider
      pagination={
        paginationFactory({
          ...paginationConfig,
          custom: true,
          paginationTotalRenderer: customTotal,
          page,
          sizePerPage,
          totalSize,
        })
      }
    >
      {
        ({
          paginationProps,
          paginationTableProps,
        }) => (
          <div>
            <div>
              <PaginationTotalStandalone
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...paginationProps}
              />
            </div>
            <div>
              <PaginationListStandalone
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...paginationProps}
              />
            </div>
            <BootstrapTable
              remote
              id={id}
              keyField={keyField}
              data={data}
              columns={columns}
              onTableChange={onTableChange}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...paginationTableProps}
            />
          </div>
        )
      }
    </PaginationProvider>
  </div>
);

export default RemotePagination;

RemotePagination.propTypes = {
  id: PropTypes.string,
  keyField: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  page: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

RemotePagination.defaultProps = {
  id: undefined,
  keyField: undefined,
};
