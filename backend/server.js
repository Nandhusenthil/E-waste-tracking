import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import municipalityRoutes from './routes/municipalityRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use('/api/municipality', municipalityRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
