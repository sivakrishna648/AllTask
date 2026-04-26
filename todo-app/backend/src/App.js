import React, { useState } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="app">
       
      <h1>Todo App</h1>

      <AddTodo refresh={refresh} />
      <TodoList refreshFlag={refreshFlag} refresh={refresh} />
    </div>
  );
}

export default App;