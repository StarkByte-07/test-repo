import React from 'react';
import { Task } from '../types/task';
import { Check, Trash2, Calendar } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_BADGES: Record<
  Task['priority'],
  { label: string; badgeClass: string }
> = {
  high: {
    label: 'High',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
  },
  medium: {
    label: 'Medium',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
  },
  low: {
    label: 'Low',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
  },
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  const priorityInfo = PRIORITY_BADGES[task.priority];
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      className={`group flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-150 ${
        task.completed
          ? 'border-slate-200/80 bg-slate-50/60 opacity-75'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0 pr-4">
        {/* Completion checkbox button */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-slate-300 hover:border-indigo-600 bg-white'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task details */}
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-medium leading-relaxed break-words ${
              task.completed
                ? 'line-through text-slate-400'
                : 'text-slate-900'
            }`}
          >
            {task.title}
          </p>

          <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${priorityInfo.badgeClass}`}
            >
              {priorityInfo.label} Priority
            </span>

            <span className="inline-flex items-center text-xs text-slate-400">
              <Calendar className="w-3 h-3 mr-1" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Delete action */}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="opacity-60 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        aria-label={`Delete task ${task.title}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TaskItem;
