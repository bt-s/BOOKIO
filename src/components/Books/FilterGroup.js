import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const FilterGroup = props => {
  const filterStatus = props.filters.reduce((pre, cur) => {
    pre[cur] = {pushed: true};
    return pre;
  }, {});
  // const [filterStatus, setFilterStatus] = useState(tmpFilterStatus);

  return (
    <div className="filters">
      {props.filters.map(title => (
        <Button
          key={'filter' + title}
          onClick={() => {
            if (!props.onFilterUpdate) {
              return;
            }
            console.log('before change', filterStatus);
            filterStatus[title].pushed = !filterStatus[title].pushed;
            console.log('after', filterStatus);

            // setFilterStatus({title: {pushed: !filterStatus[title].pushed}});
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
  onBorrowFilter: PropTypes.func,
  onHaveFilter: PropTypes.func
};

export default FilterGroup;
