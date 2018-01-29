// @flow
import React from 'react';
import classNames from 'classnames';
import './styles.css';

type Props = {
  isToggled: boolean,
  onDropdownClick: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  toggleDropdown: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  menuItems: Array<{ key: string, value: string }>,
  children: string,
};

const Dropdown = (props: Props) => {
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
        {props.menuItems.map((item) => (
          <button
            key={item.key}
            onClick={props.onDropdownClick}
            className="dropdown-item"
            type="button"
            value={item.value}
          >
            {item.key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
