import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import {useOnClickOutside} from '../../hooks';

const Dropdown = props => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowMenu(false));

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
    <div className="dd-wrapper">
      <div className="dd-header" ref={ref} onClick={() => toggleMenu()}>
        {props.headerTitle ? props.headerTitle : props.headerObject}
      </div>
      {showMenu && (
        <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {props.items.map(item => (
            <li className="dd-list-item" key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  headerTitle: PropTypes.string,
  headerObject: PropTypes.object,
  items: PropTypes.array
};

export default Dropdown;
