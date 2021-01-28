/************************************************************************
 *                                                                      *
 *   You will need to add your password to the DB_PASS = YOUR PW.       *
 *   Once you add your PW there,  go to the ".gitignore"file and        *
 *   add the ".env.example" in there if it isn't already there.         *
 *   Otherwise your password for MYSQL will be exposed in your project  *
 *                                                                      *
 ************************************************************************/

import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import "./App.css";

export default function App() {
  //Hook for input  ***ON FORM COMP
  //let [input, setInput] = useState("");
  //Hook for tasks
  let [tasks, setTasks] = useState([]);

  //Hook for executing side effects, does not effect rendering.
  //Tells React when component is first mounted on DOM or every time it is redrawn
  //we want side effect = fetch automatically and get data from the server on 1st try
  useEffect(() => {
    //FETCH DONE
    fetch("/api/todos")
      // our promise for fetch, instead of using "async", "wait", and "try"
      .then(response => response.json())
      //the response returned with actual data
      .then(tasks => {
        console.log(tasks);
        // upon success, update tasks
        setTasks(tasks);
      })
      //catches error
      .catch(err => {
        // upon failure, show error message
        console.log("ERROR:", err.message);
      });
  }, []);

  //DONE ON FORM COMP
  // const handleChange = event => {
  //   setInput(event.target.value);
  // };

  //DONE ON FORM COMP
  // const handleSubmit = event => {
  //   event.preventDefault();

  //   setTasks([input]);

  // };

  //added by us
  // const handleAddTask = newTask => {
  //   setTasks(state => [...state, newTask]);
  // };

  //task = is a name placeholer for a newTask, since it is not defined anywhere
  function addTask(task) {
    let newTask = task;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task: newTask })
    };

    fetch("/api/todos", options)
      // our promise for fetch, instead of using "async", "wait", and "try"
      .then(response => response.json())
      //the response returned with actual data
      .then(tasks => {
        console.log(tasks);
        // upon success, update tasks
        setTasks(tasks);
      })
      //catches error
      .catch(err => {
        // upon failure, show error message
        console.log("ERROR:", err.message);
      });
    // Continue fetch request here
  }

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
    <div className="App">
      {/* <h1>To Do List</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          New Task:
          <input 
          type="text"
          className="task"
          value={input}
          onChange={e => handleChange(e)} />
        </label>
        <button type="submit">Submit</button>
      </form> */}

      <TaskForm onSubmit={newTask => addTask(newTask)} />

      <h2>Current Tasks</h2>

      <ul>
        {/* "todo.map()" won't render until "todos"has value */}

        {tasks && tasks.map(t => <li map={t.task}>{t.task}</li>)}
      </ul>
    </div>
  );
}
