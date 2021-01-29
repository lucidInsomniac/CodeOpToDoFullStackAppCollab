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
import CurrentTasks from "./components/CurrentTasks";
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

  //DONE and works
  //task = is a name placeholer for a newTask, since it is not defined anywhere
  function addTask(task) {
    //pass task from Form
    // ******** we still need to add the "completed" boolean variable
    // Define new task set to task
    let newTask = { task: task, completed: false };

    //Method default is always GET, to change it, you need to
    //explicitly tell REACT to send POST request
    let options = {
      method: "POST", //We are adding a new task
      headers: {
        "Content-Type": "application/json" //Description of file type is a JSON format
      },
      //method to convert the "task" key and "newTask" value JS
      //elements into JSON elements from the data entered in the body
      body: JSON.stringify(newTask)
    };
    //Shows DB with added entry
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
  }

  /**************THIS HAS TO BE CHECKED***************************/
  function updateTask(id) {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message

    //Method default is always GET, to change it, you need to
    //explicitly tell REACT to send PUT request
    let options = {
      method: "PUT", //We are updating a task
      headers: {
        "Content-Type": "application/json" //Description of file type is a JSON format
      },

      //elements into JSON elements from the data entered in the body
      body: JSON.stringify(tasks)
    };

    fetch(`/api/todos/${id}`, options)
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
  }

  //DONE and works!
  function deleteTask(id) {
    //Method default is always GET, to change it, you need to
    //explicitly tell REACT to send DELETE request
    let options = {
      method: "DELETE", //We are removing an existing task from our list of tasks
      //method to convert the "task" key and "tasks" value JS
      //elements into JSON elements from the data entered in the body
      body: JSON.stringify(tasks)
    };

    fetch(`/api/todos/${id}`, options)
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
  }

  return (
    <div className="App">
      <TaskForm onSubmit={newTask => addTask(newTask)} />

      <CurrentTasks
        tasks={tasks}
        onDelete={id => deleteTask(id)}
        onUpdateTask={id => updateTask(id)}
      />
    </div>
  );
}
