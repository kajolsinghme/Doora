import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      name: "Setup Redux Store",
      dueDate: "2026-04-25",
      status: "todo",
    },
    {
      id: "2",
      name: "Build Task Board UI",
      dueDate: "2026-04-26",
      status: "in-progress",
    },
    {
      id: "3",
      name: "Implement Add Task Feature",
      dueDate: "2026-04-24",
      status: "done",
    },
  ],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.items.find((item) => item.id === id);
      if (task) {
        task.status = status;
      }
    },
  },
});

export const { addTask, deleteTask, updateStatus } = taskSlice.actions;

export default taskSlice.reducer;