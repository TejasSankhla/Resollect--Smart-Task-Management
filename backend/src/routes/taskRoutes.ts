import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { body } from 'express-validator';

const router = Router();

// Validation middleware
const taskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('deadline')
    .notEmpty()
    .withMessage('Deadline is required')
    .isISO8601()
    .withMessage('Invalid deadline format'),
];

// Routes
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', taskValidation, TaskController.createTask);
router.put('/:id', taskValidation, TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/status', 
  body('status')
    .isIn(['ongoing', 'success', 'failure'])
    .withMessage('Invalid status'),
  TaskController.updateTaskStatus
);

export default router; 