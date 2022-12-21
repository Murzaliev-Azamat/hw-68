import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskProps, TasksApiList} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";


interface TodoState {
  tasks: TaskProps[];
  loading: boolean;
  error: boolean;
  addLoading: boolean;
}

const initialState: TodoState = {
  tasks: [],
  loading: false,
  error: false,
  addLoading: false,
}

export const fetchTasks = createAsyncThunk<TaskProps[] | []>(
  'todo/fetch',
  async () => {
    const tasksResponse = await axiosApi.get<TasksApiList | null>('/tasks.json');
    const tasks = tasksResponse.data;
    if (tasks === null) {
      return [];
    } else {
      return Object.keys(tasks).map(key => {
        const task = tasks[key];
        return {
          ...task,
          id: key
        }
      });
    }
  },
)

export const addTask = createAsyncThunk<void, string>(
  'todo/addTask',
  async (title) => {
    await axiosApi.post<TaskProps>('/tasks.json', {title: title, status: false});
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  'todo/deleteTask',
  async (id) => {
    await axiosApi.delete('/tasks/' + id + '.json');
  }
);

export const isDoneTask = createAsyncThunk<TaskProps[], string, { state: RootState }>(
  'todo/isDone',
  async (id, thunkAPI) => {
    const tasks = thunkAPI.getState().todo.tasks;
    const indexTask = tasks.findIndex(task => task.id === id)
    if (indexTask !== -1) {
      const status = thunkAPI.getState().todo.tasks[indexTask].status;
      const title = thunkAPI.getState().todo.tasks[indexTask].title;
      await axiosApi.put("/tasks/" + id + '.json', {title: title, status: !status});
    }
    return tasks;
  }
);

export const TodoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.addLoading = false;
    });
    builder.addCase(addTask.pending, (state) => {
      state.addLoading = true;

    });
    builder.addCase(addTask.rejected, (state) => {
      state.addLoading = false;
      state.error = true;
    });
    builder.addCase(isDoneTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  }
});

export const todoReducer = TodoSlice.reducer;