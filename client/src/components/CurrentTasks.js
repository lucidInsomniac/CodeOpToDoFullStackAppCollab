import React from "react";

/*****ADDED THIS BIT, WAS NOT IMPORTED*******/
import "./TaskForm.css";

export default function CurrentTasks(props) {
  console.log("HELLO" + JSON.stringify(props));

  return (
    <div className="CurrentTasks">
      <h2>Current Tasks</h2>
      <ul>
        {/* "todo.map()" won't render until "todos"has value */}

        {props.tasks &&
          props.tasks.map(t => (
            <li
              key={t.task}
              className={t.Completed === 1 ? "CompletedTasks" : ""}
            >
              {t.task}

              <button
                id="complete"
                onClick={() => props.onUpdateTask(t.id)}
                type="button"
              >
                Complete
              </button>

              <button
                id="delete"
                onClick={() => props.onDelete(t.id)}
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
