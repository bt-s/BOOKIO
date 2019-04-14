import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const FilterGroup = props => {
  const [filterStatus, setFilterStatus] = useState(
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
            console.log('before change', filterStatus, title);
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
