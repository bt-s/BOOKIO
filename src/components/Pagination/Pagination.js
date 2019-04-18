import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  const getRange = pageNumber => {
    let i = 1;
    const range = [];

    while (i <= pageNumber) {
      range.push(i);
      i += 1;
    }

    return range;
  };

  return (
    <div className="pagination-wrapper">
      <span>Pages</span>
      <ul className="pagination">
        {getRange(props.totalPages).map((page, index) => (
          <li
            key={index}
            className={`page-item${
              props.currentPage === page - 1 ? ' active' : ''
            }`}>
            <a
              className="page-link"
              href={`#page=${page}`}
              onClick={() => props.handleChoose(page - 1)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  handleChoose: PropTypes.func
};

export default Pagination;
