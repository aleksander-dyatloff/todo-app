import Container from '@components/Container';
import TodoPushBar from '@components/TodoPushBar';
import TodosFilter from '@components/TodosFilter';
import TodosList from '@components/TodosList';
import { RootState } from '@redux/store';
import {
  fetchTodos, filteredTodos, todosSliceSelector, TodosSliceState,
} from '@redux/TodosSlice';
import { PENDING } from '@utils/constants';
import { TodoValues } from '@utils/types';
import {
  FC, memo, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TodosPage: FC = () => {
  const dispatch = useDispatch();

  const [todosFilter, setTodosFilter] = useState<TodoValues>({});

  const { fetchStatus }: TodosSliceState = useSelector(todosSliceSelector);

  const todos = useSelector((state: RootState) => filteredTodos(state, todosFilter));

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Container>
      <TodoPushBar />
      <TodosList
        todos={todos}
        loading={fetchStatus === PENDING}
      />
      <TodosFilter
        filterTodos={setTodosFilter}
        filterValues={todosFilter}
      />
    </Container>
  );
};

export default memo(TodosPage);
