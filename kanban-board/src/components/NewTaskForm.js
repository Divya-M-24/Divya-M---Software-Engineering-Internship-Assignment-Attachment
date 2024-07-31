// src/components/NewTaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const NewTaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const id = uuidv4();
    dispatch(addTask({ id, title, description }));
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Task Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskForm;
