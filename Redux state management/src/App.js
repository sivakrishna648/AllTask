import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Redux Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;