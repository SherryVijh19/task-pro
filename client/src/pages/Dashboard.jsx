import { useEffect , useState } from 'react';
import api from '../services/api'

export default function Dashboard() {
const [tasks, setTasks] = useState([]); // ✅ Always initialize with empty array
useEffect(() => {
  api.get('/tasks')
    .then((res) => {
      console.log("Fetched data:", res.data);
      setTasks(res.data);
    })
    .catch(err => {
      console.error("Error fetching tasks:", err);
      setTasks([]); // fallback to empty array
    });
}, []);

  return (
      <div>
    <h2>Dashboard</h2>
    <ul>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map(task => (
          <li key={task.id}>{task.title} - {task.status}</li>
        ))
      ) : (
        <li>No tasks found</li>
      )}
    </ul>
  </div>
  );
};