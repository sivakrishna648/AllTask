import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo } from '../api/todoApi';
import EditTodo from './EditTodo';

function TodoList({ refreshFlag, refresh }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, [refreshFlag]);

  return (
    <div>
      {todos.map((todo) => (
        <div className="todo-item" key={todo._id}>
          
          <EditTodo todo={todo} refresh={refresh} />

          <button
            className="delete-btn"
            onClick={() =>
              deleteTodo(todo._id).then(() => refresh())
            }
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default TodoList;