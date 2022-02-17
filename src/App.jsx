import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

const App = () => {
  return (
    <div className='app'>
      <TodoList />
    </div>
  );
};

export { App };
