import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import {useOnClickOutside} from '../../hooks';

const Dropdown = props => {
  const [showMenu, setShowMenu] = useState(props.defaultShowMenu);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowMenu(props.defaultShowMenu));

  useEffect(() => {
    if (showMenu) {
      window.removeEventListener('click', hideDropdownMenu);
    } else {
      window.addEventListener('click', hideDropdownMenu);
    }

    return window.removeEventListener('click', hideDropdownMenu);
  });

  const hideDropdownMenu = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`dd-wrapper ${props.classes}`} ref={ref}>
      <div className="dd-header" onClick={() => toggleMenu()}>
        {props.headerObject}
        {props.headerTitle}
      </div>
      {showMenu && (
        <ul
          className="dd-list"
          onClick={e => {
            // e.stopPropagation();
            hideDropdownMenu();
          }}>
          {props.items.map(item => (
            <li
              className={`dd-list-item ${item.classes}`}
              key={item.id + Math.random()}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  classes: PropTypes.string,
  headerTitle: PropTypes.string,
  headerObject: PropTypes.object,
  items: PropTypes.array
};

export default Dropdown;
