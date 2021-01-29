import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm(props) {
  //hook for form field
  const [input, setInput] = useState("");

  //Event handler for event listener "onChange"to capture
  //value changes when triggered by new task entered in <input>
  const handleChange = event => {
    //Sets the captured data  value from the <input> field when triggered
    // by onChange
    setInput(event.target.value);
  };

  //Event handler for the event listener "onSubmit" on <form>, form is submitted
  //once it hears a submit from the button event
  function handleSubmit(event) {
    //prevents entire document from being reloaded, and only targets event area
    event.preventDefault();

    //define state obj to be sent to parent
    const taskItem = input;

    // "Do something" -- When "onSubmit", it sends the state obj taskItem to
    // the parent "App.js", and it return, "App.js" executes the "addTask" function
    // and passes the data back down to TaskForm.js
    props.onSubmit(taskItem);

    // Reset form fields
    setInput("");
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      {/* onSubmit ={e => handleSubmit(e)} is the same as 
            onSubmit = { handleSubmit }*/}
      <form onSubmit={handleSubmit}>
        {/* htmlFor is an attribute to help make the App more 
              accessible to people with impairments. If someone clicks on "New Task"
              outside of the input field, it will still allow them to type */}
        <label htmlFor="form">
          New Task:
          <input
            // This is for css classification
            id="task"
            type="text"
            // This is for css classification
            className="task"
            //the value will be the state obj "input"
            value={input}
            // onChange goes here in <input> because new values get entered here
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TaskForm;
