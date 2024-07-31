// src/components/Column.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { Box, Typography } from '@mui/material';

const Column = ({ column, tasks }) => {
  return (
    <Box width="25%" padding={1} bgcolor="#e2e4e6" borderRadius={2}>
      <Typography variant="h6">{column.title}</Typography>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps} minHeight={200}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;
