import {
  FC, memo, useCallback, useState,
} from 'react';
import Paper from '@components/Paper';
import Input from '@components/Input';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTodo } from '@redux/TodosSlice';
import { TodoValues } from '@utils/types';
import Button from '@components/Button';
import Progress from '@components/Progress';

const TodoPushBar: FC = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { values: todoInfo, getFieldProps, resetForm } = useFormik({
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
    setLoading(true);

    await dispatch(createTodo(todoInfo));

    setLoading(false);

    resetForm();
  }, [dispatch, todoInfo, resetForm]);

  return (
    <Paper className="todo-push-bar">
      <Progress
        className="todo-push-bar__progress"
        variant="linear"
        visible={loading}
      />
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
          disabled={!todoInfo.title?.trim() || loading}
        >
          Add todo
        </Button>
      </div>
    </Paper>
  );
};

export default memo(TodoPushBar);
