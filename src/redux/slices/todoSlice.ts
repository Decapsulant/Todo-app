import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

type Task = {
  id: string;
  title: string;
  isActive: boolean;
};
type InitialStateType = {
  tasks: Task[];
  filteredTasks: Task[];
  filter: 'all' | 'active' | 'completed' | 'clearComplited';
  inputValue: string;
  theme: 'light' | 'dark';
};

const initialState: InitialStateType = {
  tasks: [],
  filteredTasks: [],
  filter: 'all',
  inputValue: '',
  theme: 'light',
};

const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    deleteTask(state, action: PayloadAction<string>) {
      let filteredTasks = state.tasks.filter((t) => t.id !== action.payload);
      if (state.filter === 'active') {
        filteredTasks = filteredTasks.filter((t) => t.isActive === true);
      } else if (state.filter === 'completed') {
        filteredTasks = filteredTasks.filter((t) => t.isActive === false);
      }
      return { ...state, tasks: filteredTasks, filteredTasks };
    },

    addTask(state, action: PayloadAction<string>) {
      const newTask = { id: v1(), title: action.payload, isActive: true };
      let filteredTasks: Task[] = [];
      if (state.filter === 'completed') {
        filteredTasks = state.tasks.filter((t) => t.isActive === false);
      } else if (state.filter === 'active' || state.filter === 'all') {
        filteredTasks = [newTask, ...state.filteredTasks];
      }
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
        filteredTasks: filteredTasks,
      };
    },

    clearCompleted(state) {
      const activeTasks = state.tasks.filter((t) => t.isActive === true);
      return { ...state, tasks: activeTasks, filteredTasks: activeTasks, filter: 'all' };
    },
    completedTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.isActive = !task.isActive;
      }
      return state;
    },
    setTitle(state, action: PayloadAction<string>) {
      return { ...state, inputValue: action.payload };
    },
    setFilter(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
      return { ...state, filter: action.payload };
    },

    setFilteredTasks(state) {
      let filteredTasks: Task[] = [];

      switch (state.filter) {
        case 'all':
          filteredTasks = state.tasks;
          break;
        case 'active':
          filteredTasks = state.tasks.filter((task) => task.isActive);
          break;
        case 'completed':
          filteredTasks = state.tasks.filter((task) => !task.isActive);
          break;
        default:
          filteredTasks = state.tasks;
          break;
      }
      return { ...state, filteredTasks };
    },

    clearCompletedTasks(state) {
      if (state.filter === 'clearComplited') {
        const activeTasks = state.tasks.filter((t) => t.isActive === true);
        return { ...state, tasks: activeTasks, filter: 'all' };
      }
    },

    toggleTheme(state) {
      const theme = state.theme === 'light' ? 'dark' : 'light';
      return { ...state, theme };
    },
  },
});

export const {
  deleteTask,
  addTask,
  clearCompleted,
  completedTask,
  setTitle,
  clearCompletedTasks,
  setFilter,
  setFilteredTasks,
  toggleTheme,
} = TodoSlice.actions;

export default TodoSlice.reducer;
