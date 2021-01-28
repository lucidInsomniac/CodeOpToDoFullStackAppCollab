import React, { useState } from "react";

function TaskForm(props) {
  const [input, setInput] = useState("");
  //add another value for boolean, to allow crossing task out

  const handleChange = event => {
    setInput(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const taskItem = input;

    // "Do something"
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
        <label htmlFor="form">
          New Task:
          <input
            id="task"
            type="text"
            className="task"
            value={input}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TaskForm;
