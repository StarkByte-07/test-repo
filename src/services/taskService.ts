import { Task, TaskPriority } from '../types/task';
import {
  countCompletedTasks,
  filterTasks,
  searchTasks,
  sortTasksByPriority,
} from '../utils/taskUtils';
import type { TaskFilter } from '../components/TaskFilters';

/**
 * Creates a new task object with a unique identifier and timestamp.
 */
export function createTask(title: string, priority: TaskPriority): Task {
  return {
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: title.trim(),
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Toggles the completion status of a task by ID.
 */
export function toggleTaskStatus(tasks: Task[], id: string): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

/**
 * Removes a task from the list by ID.
 */
export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Filters, searches, and optionally sorts tasks.
 * Uses taskUtils filterTasks, searchTasks, and sortTasksByPriority.
 */
export function processTasks(
  tasks: Task[],
  filter: TaskFilter,
  searchQuery: string,
  sortByPriority: boolean = false
): Task[] {
  let result = filterTasks(tasks, filter);
  result = searchTasks(result, searchQuery);
  if (sortByPriority) {
    result = sortTasksByPriority(result);
  }
  return result;
}

/**
 * Computes dashboard statistics using taskUtils countCompletedTasks.
 */
export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = countCompletedTasks(tasks);
  const pending = total - completed;
  return { total, completed, pending };
}

export const taskService = {
  createTask,
  toggleTaskStatus,
  deleteTask,
  processTasks,
  getTaskStats,
};

export default taskService;
