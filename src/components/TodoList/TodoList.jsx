import React, { useRef, useState } from 'react';
import { SearchInput } from '../SearchInput/SearchInput';
import { TagsList } from '../TagsList/TagsList';
import { Todo } from '../Todo/Todo';
import { TodoForm } from '../TodoForm/TodoForm';
import './TodoList.scss';

const TodoList = () => {
  const [todos, setTodos] = useState(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  );

  const [tags, setTags] = useState(
    localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : []
  );

  const [filteredTodos, setFilteredTodos] = useState([]);

  const inputRef = useRef(null);

  const updateTodosWithSave = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const updateTagsWithSave = (newTags) => {
    setTags(newTags);
    localStorage.setItem('tags', JSON.stringify(newTags));
  };

  const updateTagsInEditedTodos = (todo) => {
    const newTags = todo.text.match(/#\S+/g);
    let newTagsArray = [...tags];
    if (newTags) {
      newTagsArray = [...newTags, ...tags];
    }

    return newTagsArray;
  };

  const removeTags = (tagName) => {
    const updatedTags = tags.filter((tag) => tag !== tagName);
    updateTagsWithSave(updatedTags);
  };

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTags = todo.text.match(/#\S+/g);

    if (newTags) {
      const newTagsArray = [...newTags, ...tags];
      updateTagsWithSave(newTagsArray);
    }

    const newTodos = [todo, ...todos];
    updateTodosWithSave(newTodos);
    setFilteredTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    updateTodosWithSave(
      todos.map((item) => (item.id === todoId ? newValue : item))
    );

    updateTagsWithSave(updateTagsInEditedTodos(newValue));
    setFilteredTodos(newValue);
    inputRef.current.value = '';
  };

  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    updateTodosWithSave(updatedTodos);
    setFilteredTodos(updatedTodos);
    inputRef.current.value = '';
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    updateTodosWithSave(updatedTodos);
  };

  const inputHandleChange = (value) => {
    const filteredList = todos.filter((todo) => {
      return todo.text.search(value.toLowerCase()) !== -1;
    });
    setFilteredTodos(filteredList);
  };

  return (
    <div className='todoList'>
      <h1>Список заметок</h1>

      <hr />

      {tags.length > 0 ? (
        <TagsList tags={tags} removeTags={removeTags} />
      ) : null}

      {todos.length > 0 ? (
        <SearchInput
          inputHandleChange={inputHandleChange}
          inputRef={inputRef}
        />
      ) : null}

      <TodoForm onSubmit={addTodo} />

      {filteredTodos.length > 0 ? (
        <Todo
          todos={filteredTodos}
          tags={tags}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ) : (
        <Todo
          todos={todos}
          tags={tags}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
};

export { TodoList };
