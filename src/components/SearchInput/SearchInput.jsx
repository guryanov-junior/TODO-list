import React from 'react';
import './SearchInput.scss';

const SearchInput = (props) => {
  const { inputHandleChange, inputRef } = props;

  return (
    <input
      className='search-input'
      placeholder='Найти заметки по тегу'
      ref={inputRef}
      onChange={(e) => inputHandleChange(e.target.value)}
    />
  );
};

export { SearchInput };
