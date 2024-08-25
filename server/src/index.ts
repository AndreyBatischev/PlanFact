import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database/data-source';
import createHttpError from 'http-errors';
import planFactRoutes from './routes/planFactRoutes';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use('/api', planFactRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Page not found'))
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('Database connection error:', error));
