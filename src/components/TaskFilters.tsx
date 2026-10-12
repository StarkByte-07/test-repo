import React from 'react';
import { ListFilter, CheckCircle2, Clock } from 'lucide-react';

export type TaskFilter = 'all' | 'pending' | 'completed';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  counts?: {
    all: number;
    pending: number;
    completed: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  const filterOptions: Array<{
    id: TaskFilter;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }> = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: <ListFilter className="w-4 h-4 mr-1.5" />,
      count: counts?.all,
    },
    {
      id: 'pending',
      label: 'Pending',
      icon: <Clock className="w-4 h-4 mr-1.5 text-amber-500" />,
      count: counts?.pending,
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" />,
      count: counts?.completed,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Task filters">
      {filterOptions.map((option) => {
        const isActive = currentFilter === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
            className={`inline-flex items-center px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
            aria-pressed={isActive}
          >
            {option.icon}
            <span>{option.label}</span>
            {typeof option.count === 'number' && (
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full font-semibold ${
                  isActive
                    ? 'bg-indigo-800 text-indigo-100'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TaskFilters;
