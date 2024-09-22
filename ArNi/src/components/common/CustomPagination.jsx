import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ page, rowsPerPage, onChangePage, totalRows }) => {
  const pageCount = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="custom-pagination">
      <Pagination>
        <Pagination.Prev
          onClick={() => page > 1 && onChangePage(page - 1)}
          disabled={page === 1}
        />
        {[...Array(pageCount)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => onChangePage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => page < pageCount && onChangePage(page + 1)}
          disabled={page === pageCount}
        />
      </Pagination>
    </div>
  );
};

CustomPagination.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  totalRows: PropTypes.number.isRequired,
};

export default CustomPagination;
