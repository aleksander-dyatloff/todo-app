import { FC, memo, useCallback } from 'react';
import Paper from '@components/Paper';
import Input from '@components/Input';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTodo } from '@redux/TodosSlice';
import { TodoValues } from '@utils/types';
import Button from './Button';

const TodoPushBar: FC = (props) => {
  const dispatch = useDispatch();

  const { values: todoInfo, getFieldProps } = useFormik({
    onSubmit: () => {},
    initialValues: {
      title: '',
      description: '',
      color: 'blue',
      startTime: '',
      endTime: '',
    } as TodoValues,
  });

  const handleCreateTodo = useCallback(async () => {
    await dispatch(createTodo(todoInfo));
  }, [dispatch, todoInfo]);

  return (
    <Paper className="todo-push-bar">
      <div className="todo-push-bar__field-group">
        <Input
          className="todo-push-bar__input"
          placeholder="Todo title..."
          {...getFieldProps('title')}
        />
        <Input
          className="todo-push-bar__input"
          placeholder="Todo description..."
          variant="textarea"
          {...getFieldProps('description')}
        />
        <Button
          onClick={handleCreateTodo}
          disabled={!todoInfo.title?.trim()}
        >
          Add todo
        </Button>
      </div>
    </Paper>
  );
};

export default memo(TodoPushBar);
