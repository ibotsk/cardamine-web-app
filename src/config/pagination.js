
const pagination = {
  paginationSize: 7,
  pageStartIndex: 1,
  alwaysShowAllBtns: true, // Always show next and previous button
  withFirstAndLast: true, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  // firstPageText: 'First',
  // prePageText: 'Back',
  // nextPageText: 'Next',
  // lastPageText: 'Last',
  // nextPageTitle: 'First page',
  // prePageTitle: 'Pre page',
  // firstPageTitle: 'Next page',
  // lastPageTitle: 'Last page',
  showTotal: true,
  // paginationTotalRenderer: customTotal, //custom renderer is in RemotePagination
  sizePerPageList: [
    {
      text: '25',
      value: 25,
    },
    {
      text: '50',
      value: 50,
    },
    {
      text: '100',
      value: 100,
    },
  ], // A numeric array is also available. the purpose of above example is custom the text
};

export default pagination;
