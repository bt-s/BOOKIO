import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const FilterGroup = props => {
  /* eslint-disable no-unused-vars */
  const [filterStatus, setFilterStatus] = useState(
    /* eslint-enable no-unused-vars */

    props.filters.reduce((pre, cur) => {
      pre[cur] = {pushed: false};
      return pre;
    }, {})
  );

  return (
    <div className="filters">
      {props.filters.map(title => (
        <Button
          key={'filter' + title}
          onClick={() => {
            if (!props.onFilterUpdate || !filterStatus) {
              return;
            }

            filterStatus[title].pushed = !filterStatus[title].pushed;

            props.onFilterUpdate(
              Object.keys(filterStatus).filter(key => filterStatus[key].pushed)
            );
          }}
          type="toggle"
          className="filter-toggle"
          text={title}
        />
      ))}
    </div>
  );
};

FilterGroup.propTypes = {
  filters: PropTypes.array,
  onBorrowFilter: PropTypes.func,
  onHaveFilter: PropTypes.func
};

export default FilterGroup;
