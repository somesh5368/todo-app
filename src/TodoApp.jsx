import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";

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

  function toggleDone(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  function clearDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  function clearAll() {
    if (!window.confirm("Clear all todos?")) return;
    setTodos([]);
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", padding: 20, borderRadius: 10 }}>
      <h2>Todo List (Full Features)</h2>

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
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleDone(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={(newText) => editTodo(todo.id, newText)}
            />
          ))}
        </ul>
      )}

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={clearDone}>Clear Done</button>
        <button onClick={clearAll} style={{ background: "#555", color: "#fff" }}>
          Clear All
        </button>
      </div>
    </div>
  );
}
