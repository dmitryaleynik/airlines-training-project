// @flow
import React from 'react';
import classNames from 'classnames';

type Props = {
  isToggled: boolean,
  onDropdownClick: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  toggleDropdown: (void) => void,
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
          'd-block': props.isToggled,
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
