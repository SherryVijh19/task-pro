import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend dev server
  credentials: true                // only needed if using cookies
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Add this line below auth routes
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));

  app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

import adminRoutes from "./routes/admin.js";
app.use("/api/admin", adminRoutes);
