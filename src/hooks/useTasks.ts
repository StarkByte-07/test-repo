import { useState, useMemo, useCallback } from 'react';
import { Task, TaskPriority } from '../types/task';
import { initialTasks } from '../data/initialTasks';
import { taskService } from '../services/taskService';
import type { TaskFilter } from '../components/TaskFilters';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByPriority, setSortByPriority] = useState<boolean>(false);

  const addTask = useCallback((title: string, priority: TaskPriority) => {
    const newTask = taskService.createTask(title, priority);
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((currentTasks) => taskService.toggleTaskStatus(currentTasks, id));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((currentTasks) => taskService.deleteTask(currentTasks, id));
  }, []);

  const resetToSampleData = useCallback(() => {
    setTasks(initialTasks);
    setFilter('all');
    setSearchQuery('');
    setSortByPriority(false);
  }, []);

  // Filtered and searched tasks processed via taskService
  const visibleTasks = useMemo(() => {
    return taskService.processTasks(tasks, filter, searchQuery, sortByPriority);
  }, [tasks, filter, searchQuery, sortByPriority]);

  return {
    tasks,
    visibleTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortByPriority,
    setSortByPriority,
    addTask,
    toggleTask,
    deleteTask,
    resetToSampleData,
  };
}

export default useTasks;
