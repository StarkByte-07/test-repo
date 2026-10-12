import React from 'react';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { CheckSquare2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  emptyMessage = 'No tasks found.',
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-xl border border-dashed border-slate-300 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <CheckSquare2 className="w-6 h-6" />
        </div>
        <p className="text-slate-600 font-medium text-sm">{emptyMessage}</p>
        <p className="text-slate-400 text-xs mt-1">
          Add a task above or adjust your search and filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
