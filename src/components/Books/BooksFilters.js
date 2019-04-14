import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button/Button';

const FilterGroup = props => {
  // const [filterStatus, setFilterStatus] = useState(
  //   new Map(props.titles.map(title => [title, {pushed: false}]))
  // );
  let filterStatus = new Map(
    props.titles.map(title => [title, {pushed: false}])
  );
  console.log(
    'gen map',
    new Map(props.titles.map(title => [title, {pushed: false}]))
  );

  return (
    <div className="filters">
      {props.titles.map(title => (
        <Button
          key={'filter' + title}
          onClick={() => {
            if (!props.onFilterUpdate) {
              return;
            }
            filterStatus[title].pushed = !filterStatus[title].pushed;
            props.onFilterUpdate(
              filterStatus
                .keys()
                .filter(key => filterStatus[key].pushed)
                .reduce((pre, cur) => pre.push(cur), [])
            );
          }}
          type="toggle"
          className="filter-toggle"
          text={title}
        />
      ))}
      <Button
        // onClick={props.onFilterUpdate}
        type="toggle"
        className="filter-toggle"
        text="Books To Borrow"
      />
      <Button
        // onClick={props.onHaveFilter}
        type="toggle"
        className="filter-toggle"
        text="Books To Have"
      />
      <Button
        // onClick={props.onNearFilter}
        type="toggle"
        className="filter-toggle"
        text="Near Me"
      />
    </div>
  );
};

FilterGroup.propTypes = {
  onBorrowFilter: PropTypes.func,
  onHaveFilter: PropTypes.func
};

export default FilterGroup;
