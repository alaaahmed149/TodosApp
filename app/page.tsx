"use client";
import React, { useState } from "react";
import { useEffect } from "react";
const Home = () => {
  const [tasks, setTasks] = useState<{id:number, title:string}[]>([]);

  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<{ id: number; title: string } | null>(null);

  useEffect(()=> {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);




  function addNewTask() {
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), title: newTask }]);
    setNewTask("");
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((tId) => tId.id !== id));
  }

  function startEditing(task: { id: number; title: string }) {
    setEditingTask(task);
    setNewTask(task.title);
  }

  function saveEdit() {
    if (!editingTask || !newTask.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id ? { ...task, title: newTask } : task
      )
    );
    setEditingTask(null);
    setNewTask("");
  }

  return (
    <div>
      <h1 className="text-4xl font-bold p-4">My Todos</h1>
      <input
        type="text"
        className="m-2 p-2 border-gray-300 shadow-2xs border-1 rounded-sm "
        placeholder={editingTask ? "Edit task..." : "Add new task..."}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        onClick={editingTask ? saveEdit : addNewTask}
        className="ml-2 bg-orange-400 py-2 px-3 rounded-md text-white cursor-pointer shadow-2xs drop-shadow-md"
      >
        {editingTask ? "Save" : "Add"}
      </button>
      {editingTask && (
        <button
          onClick={() => {
            setEditingTask(null);
            setNewTask("");
          }}
          className="ml-2 bg-gray-400 py-2 px-3 rounded-md text-white cursor-pointer shadow-2xs drop-shadow-md"
        >
          Cancel
        </button>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="flex items-center gap-4 p-3 border-b-1 border-gray-400">
              <input
                type="checkbox"
                name={task.title}
                className="accent-green-800 size-5 cursor-pointer"
              />
              <h1 className="flex-grow">{task.title}</h1>
              <div className="flex gap-3">
                <button 
                  onClick={() => startEditing(task)}
                  className="px-2 rounded-md bg-blue-300 drop-shadow-md text-white cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 rounded-md bg-red-300 drop-shadow-md text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
