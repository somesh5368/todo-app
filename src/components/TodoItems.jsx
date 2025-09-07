import React, { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  function saveEdit() {
    const v = value.trim();
    if (v) onEdit(v);
    setEditing(false);
  }

  return (
    <li style={{ display: "flex", gap: 8, marginBottom: 6 }}>
      <input type="checkbox" checked={todo.done} onChange={onToggle} />

      {!editing ? (
        <span
          onDoubleClick={() => setEditing(true)}
          style={{ textDecoration: todo.done ? "line-through" : "none", cursor: "pointer" }}
        >
          {todo.text}
        </span>
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setEditing(false);
          }}
          autoFocus
        />
      )}

      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
