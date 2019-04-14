import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';

const BooksFilters = props => (
  <div className="filters">
    <Button
      onClick={props.onBorrowFilter}
      type="toggle"
      className="filter-toggle"
      text="Books To Borrow"
    />
    <Button
      onClick={props.onHaveFilter}
      type="toggle"
      className="filter-toggle"
      text="Books To Have"
    />
  </div>
);

BooksFilters.propTypes = {
  onBorrowFilter: PropTypes.func,
  onHaveFilter: PropTypes.func
};

export default BooksFilters;
