import React, { useState } from 'react';
import './TodoForm.scss';

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      id: new Date().getTime(),
      text: input,
    });
    setInput('');
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type='text'
            placeholder='Edit'
            value={input}
            name='text'
            onChange={handleChange}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type='text'
            placeholder='Ad todo'
            value={input}
            name='text'
            onChange={handleChange}
            className='todo-input'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add
          </button>
        </>
      )}
    </form>
  );
};

export { TodoForm };
