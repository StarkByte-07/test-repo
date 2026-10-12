import React from 'react';
import { Dashboard } from './components/Dashboard';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { SearchBar } from './components/SearchBar';
import { useTasks } from './hooks/useTasks';
import {
  ArrowUpDown,
  RotateCcw,
  CheckCircle,
  GitBranch,
  Layers,
  Info,
} from 'lucide-react';

export default function App() {
  const {
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
  } = useTasks();

  const [showDependencyGraph, setShowDependencyGraph] = React.useState(false);

  // Compute filter counts
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">
                  TaskFlow Test App
                </h1>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  RepoLens Target
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Deterministic module dependencies for code graph and change-impact analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDependencyGraph(!showDependencyGraph)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                showDependencyGraph
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Dependency Guide</span>
            </button>
            <button
              type="button"
              onClick={resetToSampleData}
              title="Reset tasks to initial sample data"
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* RepoLens Dependency Reference Card */}
        {showDependencyGraph && (
          <div className="bg-indigo-950 text-indigo-100 p-5 rounded-2xl border border-indigo-900 shadow-md">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-indigo-200 font-semibold text-sm">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Verified RepoLens Architectural Dependency Paths</span>
              </div>
              <button
                type="button"
                onClick={() => setShowDependencyGraph(false)}
                className="text-indigo-400 hover:text-white text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-indigo-300 leading-relaxed mb-3">
              This repository contains verified import and call graph relationships designed for static code analyzers:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-indigo-200">
              <li className="bg-indigo-900/60 p-2.5 rounded-lg border border-indigo-800/80">
                <span className="font-semibold text-white">1. Metric Calculation:</span>{' '}
                <code>taskUtils.ts (countCompletedTasks)</code> &rarr;{' '}
                <code>Dashboard.tsx</code>
              </li>
              <li className="bg-indigo-900/60 p-2.5 rounded-lg border border-indigo-800/80">
                <span className="font-semibold text-white">2. Task Pipeline:</span>{' '}
                <code>taskUtils.ts (filterTasks)</code> &rarr;{' '}
                <code>taskService.ts</code> &rarr; <code>useTasks.ts</code> &rarr;{' '}
                <code>App.tsx</code>
              </li>
              <li className="bg-indigo-900/60 p-2.5 rounded-lg border border-indigo-800/80">
                <span className="font-semibold text-white">3. Type Contracts:</span>{' '}
                <code>types/task.ts (Task)</code> &rarr;{' '}
                <code>taskService.ts</code>, <code>useTasks.ts</code>,{' '}
                <code>TaskForm.tsx</code>, <code>TaskItem.tsx</code>
              </li>
              <li className="bg-indigo-900/60 p-2.5 rounded-lg border border-indigo-800/80">
                <span className="font-semibold text-white">4. Component Hierarchy:</span>{' '}
                <code>TaskItem.tsx</code> &rarr; <code>TaskList.tsx</code> &rarr;{' '}
                <code>App.tsx</code>
              </li>
              <li className="bg-indigo-900/60 p-2.5 rounded-lg border border-indigo-800/80 md:col-span-2">
                <span className="font-semibold text-white">5. Seed Data Flow:</span>{' '}
                <code>initialTasks.ts</code> &rarr; <code>useTasks.ts</code> &rarr;{' '}
                <code>App.tsx</code>
              </li>
            </ul>
          </div>
        )}

        {/* Section 1: Dashboard Metrics */}
        <section aria-label="Task Statistics">
          <Dashboard tasks={tasks} />
        </section>

        {/* Section 2: Add Task Form */}
        <section aria-label="Create New Task">
          <TaskForm onAddTask={addTask} />
        </section>

        {/* Section 3: Filter & Search Controls */}
        <section
          aria-label="Filter and Search"
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between"
        >
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search tasks by title..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
            <TaskFilters
              currentFilter={filter}
              onFilterChange={setFilter}
              counts={{
                all: tasks.length,
                pending: pendingCount,
                completed: completedCount,
              }}
            />

            <button
              type="button"
              onClick={() => setSortByPriority(!sortByPriority)}
              className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                sortByPriority
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Sort tasks by priority (high to low)"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1" />
              <span>{sortByPriority ? 'Priority: High First' : 'Default Order'}</span>
            </button>
          </div>
        </section>

        {/* Section 4: Task List */}
        <section aria-label="Tasks List">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-700 tracking-wide uppercase">
              Tasks ({visibleTasks.length})
            </h2>
            {searchQuery && (
              <span className="text-xs text-slate-500">
                Filtered by query: &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            emptyMessage={
              searchQuery
                ? `No tasks matching "${searchQuery}".`
                : filter !== 'all'
                ? `No ${filter} tasks found.`
                : 'No tasks currently available.'
            }
          />
        </section>

        {/* Informational Footer Note */}
        <footer className="pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
          <p className="flex items-center justify-center gap-1">
            <Info className="w-3.5 h-3.5" />
            TaskFlow Test App &bull; Built with clean modular TypeScript relationships for RepoLens analysis
          </p>
        </footer>
      </main>
    </div>
  );
}
