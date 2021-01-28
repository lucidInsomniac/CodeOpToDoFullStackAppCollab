import React from "react";

export default function CurrentTasks(props) {
  return (
    <div className="CurrentTasks">
      <h2>Current Tasks</h2>
      <ul>
        {/* "todo.map()" won't render until "todos"has value */}

        {props.tasks &&
          props.tasks.map(t => (
            <li className="task" key={t.task}>
              {t.task}
              <button onClick={e => props.onDelete(t.id)} type="button">
                Sayonara!
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
