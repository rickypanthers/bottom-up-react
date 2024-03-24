import { useState } from 'react';
import TaskList from './Tasklist';
import './App.css';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleAddTask = () => {
    let updatedTodos = [...allTodos];
    updatedTodos.push({ task: inputVal, checked: false });
    setAllTodos(updatedTodos);
    setInputVal('');
  };
  return (
    <div>
      <h1>TODO LIST</h1>
      <div className="parent-input-div">
        <input
          type="text"
          className="input-task"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button
          className="add-task-btn"
          onClick={handleAddTask}
          disabled={!inputVal}
        >
          Add Task
        </button>
      </div>
      {allTodos.length > 0 && (
        <TaskList tasks={allTodos} handleTaskUpdate={setAllTodos} />
      )}
    </div>
  );
}

export default App;
