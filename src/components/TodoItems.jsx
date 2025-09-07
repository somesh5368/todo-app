import React, { useState, useEffect } from "react";

const STORAGE_KEY = "vite_todos_v1";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    const newTodo = { id: generateId(), text: t, done: false };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", padding: 20, borderRadius: 10 }}>
      <h2>Todo List (Part 1)</h2>

      <form onSubmit={addTodo} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <div>No todos yet.</div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.done} readOnly />
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
