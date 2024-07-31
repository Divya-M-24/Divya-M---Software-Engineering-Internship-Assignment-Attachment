// src/components/SearchBar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/tasksSlice';
import { TextField } from '@mui/material';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <TextField
      label="Search tasks..."
      variant="outlined"
      fullWidth
      onChange={handleSearch}
      margin="normal"
    />
  );
};

export default SearchBar;
