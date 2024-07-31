// src/redux/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Task 1', description: 'Description for Task 1' },
    'task-2': { id: 'task-2', title: 'Task 2', description: 'Description for Task 2' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Peer Review',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
  searchTerm: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      if (!destination) return;

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        state.columns[source.droppableId].taskIds = newTaskIds;
        return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      state.columns[source.droppableId].taskIds = startTaskIds;

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      state.columns[destination.droppableId].taskIds = finishTaskIds;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addTask: (state, action) => {
      const { id, title, description } = action.payload;
      const newTask = { id, title, description };
      state.tasks[id] = newTask;
      state.columns['column-1'].taskIds.push(id);
    },
  },
});

export const { moveTask, setSearchTerm, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
