import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
  setTasks(res.data);
};

 const addTask = async () => {
  await axios.post(`${process.env.REACT_APP_API_URL}/add`, { task });
  setTask("");
  fetchTasks();
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;