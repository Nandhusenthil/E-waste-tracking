import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
