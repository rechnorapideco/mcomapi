import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import categoryRoutes from './src/routes/categoryRoutes.js';
import movieRoutes from './src/routes/movieRoutes.js';
import communityMessageRoutes from './src/routes/communityMessageRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);

app.use('/api', communityMessageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/movies', movieRoutes);

export default app;
