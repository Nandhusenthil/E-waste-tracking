import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import municipalityRoutes from './routes/municipalityRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import recyclerRoutes from './routes/recyclerRoutes.js';
 

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/municipality', municipalityRoutes);
app.use('/api/recycler',recyclerRoutes);


app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
