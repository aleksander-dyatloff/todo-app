import Container from '@components/Container';
import TodoPushBar from '@components/TodoPushBar';
import TodosList from '@components/TodosList';
import { fetchTodos, todosSliceSelector, TodosSliceState } from '@redux/TodosSlice';
import { PENDING } from '@utils/constants';
import { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TodosPage: FC = (props) => {
  const dispatch = useDispatch();

  const { todos, fetchStatus }: TodosSliceState = useSelector(todosSliceSelector);

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
    </Container>
  );
};

export default memo(TodosPage);
