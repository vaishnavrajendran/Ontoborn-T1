import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  userId: string;
  name: string;
  description: string;
  status: string;
}

interface TaskState {
  userTasks: Task[] | null;
  loading: boolean
}

const initialState: TaskState = {
  userTasks: null,
  loading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setUserTasks: (state, action: PayloadAction<Task[] | null>) => {
      state.userTasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      if (state.userTasks) {
        state.userTasks.push(action.payload);
      }
    },
    removeTask: (state, action) => {
      const taskIdToRemove = action.payload;
      if (state.userTasks) {
        const updatedTasks = state.userTasks.filter(task => task._id !== taskIdToRemove);

        return {
          ...state,
          userTasks: updatedTasks
        };
      }
      return state;
    },
    updateUserTask: (state, action) => {
      if (state.userTasks) {
        const updatedTasks = state.userTasks.map(task => {
          if (task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        });
        state.userTasks = updatedTasks;
      }
    },    
    setLoading: (state) => {
      state.loading = !state.loading
    }
  },
});

export default taskSlice.reducer;
export const { setUserTasks, addTask, removeTask, setLoading, updateUserTask } = taskSlice.actions;
