import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Todo.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { TodoForm } from '../TodoForm/TodoForm';

const Todo = (props) => {
  const { updateTodo, todos, completeTodo, removeTodo } = props;

  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <TransitionGroup>
      {todos.map((todo, index) => (
        <CSSTransition key={todo.id} timeout={500} classNames='item'>
          <div
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={index}
          >
            <div
              key={todo.id}
              onClick={() => completeTodo(todo.id)}
              className='todo-text'
            >
              {todo.text}
            </div>
            <div className='icons'>
              <FiEdit
                onClick={() => {
                  setEdit({
                    id: todo.id,
                    value: todo.text,
                  });
                }}
                className='edit-icon'
              />
              <AiOutlineCloseCircle
                onClick={() => removeTodo(todo.id)}
                className='delete-icon'
              />
            </div>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export { Todo };
