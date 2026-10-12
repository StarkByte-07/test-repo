import { Task } from '../types/task';
import type { TaskFilter } from '../components/TaskFilters';

/**
 * Filters a list of tasks based on completion status.
 */
export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }
  if (filter === 'pending') {
    return tasks.filter((task) => !task.completed);
  }
  return tasks;
}

/**
 * Searches tasks by title matching the query substring case-insensitively.
 */
export function searchTasks(tasks: Task[], query: string): Task[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return tasks;
  }
  return tasks.filter((task) => task.title.toLowerCase().includes(trimmed));
}

/**
 * Calculates the total number of completed tasks.
 */
export function countCompletedTasks(tasks: Task[]): number {
  return tasks.reduce((count, task) => (task.completed ? count + 1 : count), 0);
}

/**
 * Sort weight mapping for task priorities.
 */
const PRIORITY_ORDER: Record<Task['priority'], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * Sorts tasks by priority descending (high -> medium -> low).
 */
export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
}
