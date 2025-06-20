import Task from "../models/Task.js";

export const getAdminMetrics = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const totalTasks = await Task.countDocuments();
    const tasksPerStatus = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const topUsers = await Task.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ totalTasks, tasksPerStatus, topUsers });
  } catch (err) {
    res.status(500).json({ message: "Failed to get metrics", error: err.message });
  }
};
