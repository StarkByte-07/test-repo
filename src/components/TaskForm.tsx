import React, { useState } from 'react';
import { Task, TaskPriority } from '../types/task';
import { PlusCircle } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string, priority: TaskPriority) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title cannot be empty.');
      return;
    }

    onAddTask(trimmedTitle, priority);
    setTitle('');
    setPriority('medium');
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs"
    >
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Title Input */}
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            placeholder="What needs to be done?"
            className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              error
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-500/20'
            }`}
          />
        </div>

        {/* Priority Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="priority-select" className="text-xs font-medium text-slate-500 sr-only">
            Priority
          </label>
          <select
            id="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="w-full sm:w-auto px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Add Task
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-rose-600 mt-2 font-medium">{error}</p>}
    </form>
  );
};

export default TaskForm;
