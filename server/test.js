import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connection Success"))
  .catch(err => console.error("❌ Connection Error", err));
