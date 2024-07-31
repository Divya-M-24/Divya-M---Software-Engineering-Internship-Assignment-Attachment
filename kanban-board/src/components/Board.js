// src/components/Board.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveTask } from '../redux/tasksSlice';
import Column from './Column';
import SearchBar from './SearchBar';
import NewTaskForm from './NewTaskForm';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Board = () => {
  const dispatch = useDispatch();
  const { columns, columnOrder, searchTerm, tasks } = useSelector((state) => state.tasks);
  const [showForm, setShowForm] = React.useState(false);

  const onDragEnd = (result) => {
    dispatch(moveTask(result));
  };

  const filteredTasks = Object.keys(tasks).filter((taskId) =>
    tasks[taskId].title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <SearchBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" justifyContent="space-around">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const columnTasks = column.taskIds.map((taskId) => tasks[taskId]).filter((task) => filteredTasks.includes(task.id));
            return <Column key={column.id} column={column} tasks={columnTasks} />;
          })}
        </Box>
      </DragDropContext>
      <Fab color="primary" aria-label="add" onClick={() => setShowForm(true)} style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
      {showForm && <NewTaskForm onClose={() => setShowForm(false)} />}
    </Box>
  );
};

export default Board;
