import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config';
import taskRoutes from './routes/taskRoutes';

export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(cors(config.cors));
  app.use(express.json());

  // Health check route
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // API routes
  app.use('/api/tasks', taskRoutes);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Something went wrong!',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  return app;
}; 