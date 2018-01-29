import React from 'react';
import classNames from 'classnames';
import './styles.css';

const Dropdown = props => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        onClick={props.toggleDropdown}
      >
        {props.children}
      </button>
      <div
        className={classNames('dropdown-menu', {
          visible: props.isToggled,
        })}
      >
        {props.menuItems.map(item => (
          <button
            key={item.filter}
            onClick={props.onDropdownClick}
            className="dropdown-item"
            type="button"
            filter={item.filter}
          >
            {item.key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
