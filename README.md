# TaskFlow Test App

**TaskFlow Test App** is a clean, modular React and TypeScript task management application. It serves as a benchmark test repository for **RepoLens**, a static code analysis system that inspects source code, function relationships, file dependencies, and change-impact propagation.

This repository prioritizes explicit, deterministic, and verifiable source-code relationships across modules, utilities, services, hooks, and UI components.

---

## 1. Features

- **Dashboard Metrics**: Live visual summary of total, pending, and completed tasks with dynamic completion rate.
- **Task Creation**: Add tasks with customized titles and priority tiers (`low`, `medium`, `high`).
- **Interactive Task List**: Toggle completion state or delete tasks.
- **Filtering & Search**:
  - Filter tasks by status (`All`, `Pending`, `Completed`) with real-time badges.
  - Case-insensitive search by task title.
  - Optional priority sorting (`High` &rarr; `Medium` &rarr; `Low`).
- **Sample Seed Data**: Pre-loaded tasks so the application is functional immediately upon launch.
- **Clean Responsive UI**: Styled with Tailwind CSS without unnecessary abstractions.

---

## 2. Installation & Running Locally

Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Type check and lint
npm run lint
```

The application will be served locally at `http://localhost:3000`.

---

## 3. Folder Structure

```text
/
├── index.html                  # HTML entry point with metadata
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler options
├── vite.config.ts              # Vite bundler configuration
├── README.md                   # Repository documentation
└── src/
    ├── main.tsx                # Application mounting entry point
    ├── App.tsx                 # Root application component orchestrating UI and state
    ├── index.css               # Global Tailwind CSS directives
    ├── types/
    │   └── task.ts             # Core Task and TaskPriority TypeScript type definitions
    ├── data/
    │   └── initialTasks.ts     # Sample task dataset for initial state and reset
    ├── utils/
    │   └── taskUtils.ts        # Pure utility functions (filtering, searching, counting, sorting)
    ├── services/
    │   └── taskService.ts      # Business logic service consuming task utilities
    ├── hooks/
    │   └── useTasks.ts         # Custom React hook managing task state and mutations
    └── components/
        ├── Dashboard.tsx       # Metric cards component using countCompletedTasks
        ├── TaskForm.tsx        # Task submission form importing Task type
        ├── TaskList.tsx        # Task list wrapper importing TaskItem
        ├── TaskItem.tsx        # Single task card with complete/delete controls
        ├── TaskFilters.tsx     # Filter buttons exporting TaskFilter type
        └── SearchBar.tsx       # Reusable search input component
```

---

## 4. Modules & Responsibilities

| Module | File | Responsibility |
| :--- | :--- | :--- |
| **Type Definitions** | `src/types/task.ts` | Defines the central `Task` interface, `TaskPriority` union, and input shapes. |
| **Initial Data** | `src/data/initialTasks.ts` | Exports seeded array of `Task` objects used as default state. |
| **Utilities** | `src/utils/taskUtils.ts` | Pure helper functions: `filterTasks`, `searchTasks`, `countCompletedTasks`, and `sortTasksByPriority`. |
| **Service Layer** | `src/services/taskService.ts` | Orchestrates business logic, task creation, updates, and delegates data transformations to `taskUtils.ts`. |
| **Custom Hook** | `src/hooks/useTasks.ts` | Encapsulates React state, memoized calculations, and action handlers by consuming `taskService.ts`. |
| **Dashboard** | `src/components/Dashboard.tsx` | Computes and presents aggregate task statistics using `countCompletedTasks`. |
| **Task Form** | `src/components/TaskForm.tsx` | Provides validated form inputs for adding new tasks typed with `TaskPriority`. |
| **Task Item** | `src/components/TaskItem.tsx` | Renders individual task items with priority indicators, date display, and action buttons. |
| **Task List** | `src/components/TaskList.tsx` | Maps over the task collection and renders `TaskItem` instances. |
| **Task Filters** | `src/components/TaskFilters.tsx` | Filter button group; exports the `TaskFilter` type (`'all' \| 'pending' \| 'completed'`). |
| **Search Bar** | `src/components/SearchBar.tsx` | Reusable search input with clear button. |
| **Root Component** | `src/App.tsx` | Assembles all components and connects them via the `useTasks` hook. |

---

## 5. Known Dependency Relationships for RepoLens

The repository is purposefully structured with clear dependency paths to validate static code analysis, call graph generation, and change-impact propagation:

### Relationship 1: Direct Utility Call in Presentation Component
- **Source**: `src/utils/taskUtils.ts` (`countCompletedTasks`)
- **Consumer**: `src/components/Dashboard.tsx`
- **Impact Path**: Modifying `countCompletedTasks` in `taskUtils.ts` directly impacts metric computation in `Dashboard.tsx`.

### Relationship 2: Multi-Hop Transformation & State Pipeline
- **Source**: `src/utils/taskUtils.ts` (`filterTasks`, `searchTasks`, `sortTasksByPriority`)
- **Consumers**: `src/services/taskService.ts` &rarr; `src/hooks/useTasks.ts` &rarr; `src/App.tsx`
- **Impact Path**: Changing filtering or sorting behavior in `taskUtils.ts` propagates through `taskService.processTasks`, altering `visibleTasks` in `useTasks.ts`, which controls what `App.tsx` supplies to `TaskList.tsx`.

### Relationship 3: Core Domain Type Propagation
- **Source**: `src/types/task.ts` (`Task`, `TaskPriority`)
- **Consumers**: `src/services/taskService.ts`, `src/hooks/useTasks.ts`, `src/components/TaskForm.tsx`, `src/components/TaskItem.tsx`, `src/data/initialTasks.ts`
- **Impact Path**: Modifying fields on the `Task` interface (e.g., adding `dueDate` or altering `priority` values) triggers type-checking ripples across the service layer, state hook, task form inputs, and task rendering items.

### Relationship 4: Component Hierarchy & Rendering Composition
- **Source**: `src/components/TaskItem.tsx`
- **Consumers**: `src/components/TaskList.tsx` &rarr; `src/App.tsx`
- **Impact Path**: Modifying `TaskItem.tsx` (such as its layout, action callbacks, or prop types) changes the rendering and interface contract of `TaskList.tsx`, which is composed in `App.tsx`.

### Relationship 5: Initial State Injection
- **Source**: `src/data/initialTasks.ts` (`initialTasks`)
- **Consumer**: `src/hooks/useTasks.ts` &rarr; `src/App.tsx`
- **Impact Path**: Altering initial seed data or property values directly affects the initial state initialized in `useTasks.ts` and rendered upon initial page load.

---

## 6. Verification & Quality

- Written in strict TypeScript (`tsc --noEmit` clean).
- Zero circular dependencies.
- Every imported entity is genuinely consumed in runtime code logic and rendering.
