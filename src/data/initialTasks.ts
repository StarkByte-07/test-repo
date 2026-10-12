import { Task } from '../types/task';

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review pull request for authentication module',
    priority: 'high',
    completed: true,
    createdAt: '2026-10-10T09:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Set up RepoLens code graph analysis rules',
    priority: 'high',
    completed: false,
    createdAt: '2026-10-10T10:30:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Document component hierarchy and data flow',
    priority: 'medium',
    completed: false,
    createdAt: '2026-10-10T11:15:00.000Z',
  },
  {
    id: 'task-4',
    title: 'Implement unit tests for utility functions',
    priority: 'medium',
    completed: true,
    createdAt: '2026-10-11T08:00:00.000Z',
  },
  {
    id: 'task-5',
    title: 'Optimize Tailwind bundle and responsive styles',
    priority: 'low',
    completed: false,
    createdAt: '2026-10-11T13:45:00.000Z',
  },
];
