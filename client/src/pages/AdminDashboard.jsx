import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (user?.role === "admin") {
      api.get("/admin/metrics")
        .then((res) => setMetrics(res.data))
        .catch(console.error);
    }
  }, [user]);

  if (user?.role !== "admin") return <p>Access denied.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Metrics</h2>
      {metrics ? (
        <div className="mt-4">
          <p>Total Tasks: {metrics.totalTasks}</p>
          <h3>Tasks Per Status:</h3>
          <ul>
            {metrics.tasksPerStatus.map((item) => (
              <li key={item._id}>{item._id}: {item.count}</li>
            ))}
          </ul>
          <h3>Top Users:</h3>
          <ul>
            {metrics.topUsers.map((user, i) => (
              <li key={i}>User ID: {user._id}, Tasks: {user.count}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
