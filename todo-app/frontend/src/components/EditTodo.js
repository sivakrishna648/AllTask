import React, { useState } from 'react';
import { updateTodo } from '../api/todoApi';

function EditTodo({ todo, refresh }) {
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    if (!title.trim()) return;

    await updateTodo(todo._id, { title });
    setIsEditing(false);
    refresh();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button className="edit-btn" onClick={handleUpdate}>
            Save
          </button>

          <button
            onClick={() => {
              setTitle(todo.title);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={{ flex: 1, textAlign: 'left' }}>
            {todo.title}
          </span>

          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default EditTodo;