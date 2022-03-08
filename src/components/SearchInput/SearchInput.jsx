import React from 'react';
import './SearchInput.scss';

const SearchInput = (props) => {
  const { inputHandleChange, inputRef } = props;

  return (
    <input
      className='search-input'
      placeholder='Sort with tags'
      ref={inputRef}
      onChange={(e) => inputHandleChange(e.target.value)}
    />
  );
};

export { SearchInput };
