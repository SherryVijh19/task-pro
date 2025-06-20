// 
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    api.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = tasks.filter((t) =>
    statusFilter ? t.status === statusFilter : true
  );

  return (
    <div>
      <h2>Welcome, {user?.role}</h2>

      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <ul>
        {filtered.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
