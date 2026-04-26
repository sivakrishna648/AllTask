import React, { useState } from 'react';
import { addTodo } from '../api/todoApi';

function AddTodo({ refresh }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    await addTodo({ title });
    setTitle('');
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;