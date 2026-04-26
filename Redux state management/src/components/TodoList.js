import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../features/todos/todoSlice';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <span
            className={todo.completed ? 'completed' : ''}
            onClick={() => dispatch(toggleTodo(todo.id))}
          >
            {todo.text}
          </span>

          <button onClick={() => dispatch(deleteTodo(todo.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;