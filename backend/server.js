import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import municipalityRoutes from './routes/municipalityRoutes.js';
<<<<<<< HEAD
import recyclerRoutes from './routes/recyclerRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'; // 👈 added
import cors from 'cors';
=======
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import recyclerRoutes from './routes/recyclerRoutes.js';
 
>>>>>>> a6e293b9f932b7efb2692c61ab903b813c3e54ed

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
=======
app.use('/api/auth', authRoutes);
app.use('/api/municipality', municipalityRoutes);
app.use('/api/recycler',recyclerRoutes);
>>>>>>> a6e293b9f932b7efb2692c61ab903b813c3e54ed

// API Routes
app.use('/api/municipality', municipalityRoutes);
app.use('/api/recycler', recyclerRoutes);
app.use('/api/dashboard', dashboardRoutes); // 👈 added

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
