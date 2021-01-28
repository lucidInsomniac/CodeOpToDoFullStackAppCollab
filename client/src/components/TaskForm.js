import React, { useState } from "react";

function TaskForm(props) {
  const [input, setInput] = useState("");

  const handleChange = event => {
    setInput(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();

    //let task = event.target;

    const taskItem = input;

    // "Do something"
    props.onSubmit(taskItem);

    // Reset form fields
    setInput("");
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Task:
          <input
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
