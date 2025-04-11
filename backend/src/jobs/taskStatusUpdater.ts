import cron from 'node-cron';
import { TaskService } from '../services/taskService';

export const initializeTaskStatusJobs = (): void => {
  // Schedule task status updates every minute
  cron.schedule('* * * * *', async () => {
    try {
      await TaskService.updateExpiredTasks();
      console.log('Updated expired tasks');
    } catch (error) {
      console.error('Failed to update expired tasks:', error);
    }
  });
}; 