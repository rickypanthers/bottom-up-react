import { useState, useEffect } from 'react';
import './App.css';
const TaskList = ({ tasks, handleTaskUpdate }) => {
  const [checked, setChecked] = useState({});
  const [editMode, setEditMode] = useState({});
  const [inputVal, setInputVal] = useState('');
  useEffect(() => {
    for (let i = 0; i < tasks.length; i++) {
      setChecked((prev) => ({ ...prev, [i]: tasks[i].checked }));
      setEditMode((prev) => ({ ...prev, [i]: false }));
    }
  }, [tasks]);
  const handleChecked = (e, id) => {
    setChecked((prev) => {
      return { ...prev, [id]: e.target.checked };
    });
    const tasksCopy = tasks.map((task, id1) => {
      if (id === id1) {
        task.checked = e.target.checked;
      }
      return task;
    });
    handleTaskUpdate(tasksCopy);
  };

  const updateTask = (e, id1) => {
    if (e.key === 'Enter') {
      const tasksCopy = tasks.map((task, id) => {
        if (id === id1) {
          task.task = inputVal;
        }
        return task;
      });
      handleTaskUpdate(tasksCopy);

      setEditMode((prev) => {
        return { ...prev, [id1]: false };
      });
      setInputVal('');
    }
  };
  const handleTaskChange = (e) => {
    setInputVal(e.target.value);
  };

  const startEditing = (e, id1) => {
    let keys_edit = Object.keys(editMode);
    let editObj = editMode;
    for (let i = 0; i < keys_edit.length; i++) {
      if (editObj[i] === true && i !== id1) {
        editObj[i] = false;
      }
    }
    setEditMode((prev) => {
      return { ...prev, editObj, [id1]: true };
    });
    let target_task = tasks.filter((task, id) => id === id1);
    setInputVal(target_task[0].task);
  };

  const deleteTask = (e, id) => {
    const tasksCopy = tasks.filter((task, id1) => id1 !== id);
    handleTaskUpdate(tasksCopy);
  };
  return (
    <div>
      {tasks.map((task, id) => (
        <div key={id} style={{ display: 'flex', marginBottom: '10px' }}>
          <input
            type="checkbox"
            className="checkbox-style"
            checked={checked[id]}
            onChange={(e) => handleChecked(e, id)}
          />
          {!editMode[id] && (
            <div className={checked[id] ? 'task-div disabled' : 'task-div'}>
              {task.task}
            </div>
          )}
          {editMode[id] && (
            <input
              type="text"
              value={inputVal}
              className="task-div"
              onKeyDown={(e) => updateTask(e, id)}
              onChange={handleTaskChange}
            />
          )}

          <button
            onClick={(e) => startEditing(e, id)}
            className="task-btns"
            disabled={editMode[id] || checked[id]}
            name={id}
          >
            Edit
          </button>
          <button
            onClick={(e) => deleteTask(e, id)}
            className="task-btns"
            disabled={editMode[id] || checked[id]}
            name={id}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
