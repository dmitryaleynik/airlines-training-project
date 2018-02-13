import React from 'react';
import cn from 'classnames';

const BackButton = (props) => {
  const handleClick = () => {
    props.history.goBack();
  };

  return (
    <button
      className={cn('btn btn-sm btn-dark', props.className)}
      onClick={handleClick}
    >
      {'< Back'}
    </button>
  );
};

export default BackButton;
