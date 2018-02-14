// @flow
import React from 'react';
import cn from 'classnames';

type Props = {
  className: string,
  history: Object,
};

const BackButton = (props: Props) => {
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
