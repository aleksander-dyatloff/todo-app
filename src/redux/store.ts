import { configureStore } from '@reduxjs/toolkit';
import TodosSliceReducer from '@redux/TodosSlice';

const reducer = {
  todosSliceState: TodosSliceReducer,
};

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;
