import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import "./App.css";

export default function App() {
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
      })
      .catch(error => {
        // upon failure, show error message
      });
  }, []);

  const addTask = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: input })
    });
    // Continue fetch request here
  };

  const updateTask = id => {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
  };

  const deleteTask = id => {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
  };

  return (
    <div>
      <Form onSubmit={t => addTask(t)} />
    </div>
  );
}
