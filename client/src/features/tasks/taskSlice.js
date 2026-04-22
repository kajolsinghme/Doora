import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
        state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateStatus: (state, action) => {
        const {id, status} = action.payload
        const task = state.items.find((item) => item.id ===  id)
        if(task){
            task.status = status
        }
    }
  },
});

export const {addTask, deleteTask, updateStatus} = taskSlice.actions

export default taskSlice.reducer