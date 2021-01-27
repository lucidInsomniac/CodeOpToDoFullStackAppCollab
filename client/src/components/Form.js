import React, { useState } from "react";

export default function Form(props) {
  //check props
  console.log(props);

  //Hooks for form field
  let [input, setInput] = useState("");
  const [task, setTask] = useState("");

  //Event handler for event listener onSubmit, when values submited
  const handleSubmit = event => {
    //prevent entire doc from reloading, only targeted event
    event.preventDefault();

    //define state obj
    let todo = { task: task };

    //set state obj to send to parent
    props.onSubnmit(todo);
    //reset field after submit
    setTask("");
  };

  //Event handler for event listener onChange, when values update
  const handleChange = event => {
    //capture event change for key and value in obj
    let input = event.target;
    //set captured changed values for event to event name
    if (input) {
      setInput(event.target.value);
    }
  };

  //render View
  return (
    <div className="Form">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">
          New Task:
          <input name="task" value={task} type="text" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
