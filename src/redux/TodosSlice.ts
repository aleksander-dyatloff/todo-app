import { RootState } from '@redux/store';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  FULFILLED, IDLE, PENDING, REJECTED,
} from '@utils/constants';
import path from '@utils/paths';
import {
  FetchStatus, Todo, TodoInfo, TodoValues,
} from '@utils/types';
import axios from 'axios';

const name: string = 'todos';

export const fetchTodos = createAsyncThunk(`${name}/fetchTodos`, async () => {
  const response = await axios.get(path.api.todos);

  const fetchedTodos: Todo[] = response.data;

  return fetchedTodos;
});

export const createTodo = createAsyncThunk(`${name}/createTodo`, async (todoInfo: TodoValues) => {
  const response = await axios.post(path.api.todos, todoInfo);

  const createdTodo: Todo = response.data;

  return createdTodo;
});

export const deleteTodo = createAsyncThunk(`${name}/deleteTodo`, async (todoId: number) => {
  const response = await axios.delete(path.api.todo(todoId));

  const deletedTodo: Todo = response.data;

  return deletedTodo.id;
});

export const updateTodo = createAsyncThunk(`${name}/updateTodo`, async (todoInfo: TodoInfo) => {
  const { id, ...restTodoInfo } = todoInfo;

  const response = await axios.put(path.api.todo(id), restTodoInfo);

  const updatedTodo: Todo = response.data;

  return updatedTodo;
});

export interface TodosSliceState {
  fetchStatus: FetchStatus
  todos: Todo[]
}

const initialState: TodosSliceState = {
  fetchStatus: IDLE,
  todos: [],
};

const TodosSlice = createSlice({
  name,
  initialState,
  reducers: {},

  extraReducers: ({ addCase }) => {
    addCase(fetchTodos.fulfilled, (state, action) => {
      const fetchedTodos = action.payload;

      state.todos = fetchedTodos;

      state.fetchStatus = FULFILLED;
    });
    addCase(fetchTodos.rejected, (state) => {
      state.fetchStatus = REJECTED;
    });
    addCase(fetchTodos.pending, (state) => {
      state.fetchStatus = PENDING;
    });

    addCase(createTodo.fulfilled, (state, action) => {
      const createdTodo: Todo = action.payload;

      state.todos.push(createdTodo);
    });

    addCase(deleteTodo.fulfilled, (state, action) => {
      const deletedTodoId: number = action.payload;

      state.todos = state.todos.filter((todo) => todo.id !== deletedTodoId);
    });

    addCase(updateTodo.fulfilled, (state, action) => {
      const updatedTodo: Todo = action.payload;

      const preUpdatedTodo = state.todos.find((todo) => todo.id === updatedTodo.id);

      Object.assign(preUpdatedTodo, updatedTodo);
    });
  },
});

export const todosSliceSelector = (state: RootState) => state.todosSliceState;

export const filteredTodos = createSelector(
  (state: RootState) => state.todosSliceState.todos,
  (_: RootState, todoMatch: TodoValues) => todoMatch,
  (todos: Todo[], todoMatch) => {
    const {
      isDone, color,
    } = todoMatch;

    return todos.filter((todo) => {
      if (isDone && todo.isDone !== isDone) return false;

      if (color && todo.color !== color) return false;

      return true;
    });
  },
);

export default TodosSlice.reducer;
