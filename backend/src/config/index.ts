import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app',
  },
  cors: {
    // Add CORS configuration options here
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }
}; 