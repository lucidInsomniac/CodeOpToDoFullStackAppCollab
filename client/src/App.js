/************************************************************************
 *                                                                      *
 *   You will need to add your password to the DB_PASS = YOUR PW.       *
 *   Once you add your PW there,  go to the ".gitignore"file and        *
 *   add the ".env.example" in there if it isn't already there.         *
 *   Otherwise your password for MYSQL will be exposed in your project  *
 *                                                                      *
 *   IMPORTANT: Git add, commit, and                                    *
 *   push NEED ON BOTH SERVER AND CLIENT!!                              *
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
    fetch("/api/todos") //this connects to the server api.js
      // our promise for fetch, instead of using "async", "wait", and "try"
      //This is the request
      .then(response => response.json())
      //this is the response returned with actual data
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
  }, []); //gets saved in the state

  //task = is a name placeholer for a newTask, since it is not defined anywhere
  function addTask(task) {
    //pass task from Form
    // ******** we still need to add the "completed" boolean variable
    let newTask = task;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task: newTask })
    };

    fetch("/api/todos", options) //Shows DB with added entry
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

  // const deleteTask = id => {

  //   let options = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ task: tasks })
  //   };

  //   fetch(`/api/todos/${id}`, options)
  //     // our promise for fetch, instead of using "async", "wait", and "try"
  //     .then(response => response.json())
  //     //the response returned with actual data
  //     .then(tasks => {
  //       console.log(tasks);
  //       // upon success, update tasks
  //       setTasks(tasks);
  //     })
  //     //catches error
  //     .catch(err => {
  //       // upon failure, show error message
  //       console.log("ERROR:", err.message);
  //     });
  //   // Continue fetch request here

  //   // delete task from database
  //   // upon success, update tasks
  //   // upon failure, show error message
  // };

  return (
    <div className="App">
      <TaskForm onSubmit={newTask => addTask(newTask)} />

      <h2>Current Tasks</h2>

      <ul>
        {/* "todo.map()" won't render until "todos"has value */}

        {tasks && tasks.map(t => <li map={t.task}>{t.task}</li>)}
      </ul>
    </div>
  );
}
