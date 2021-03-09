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
import mediaQuery from '@utils/mediaQuery';
import ColorPicker from '@components/ColorPicker';
import TrippleDotIcon from '@icons/TrippleDotIcon';
import IconButton from './IconButton';

const TodoPushBar: FC = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [expandedSettings, setExpandedSettings] = useState(false);

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

  const handleToggleExpandSettings = useCallback(() => {
    setExpandedSettings((prevState) => !prevState);
  }, []);

  return (
    <Paper className="todo-push-bar">
      <Progress
        className="todo-push-bar__progress"
        variant="linear"
        visible={loading}
      />
      <div className="todo-push-bar__field-group">
        <Input
          autoComplete="off"
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
        <div className="todo-push-bar__action-bar">
          <Button
            color={todoInfo.color}
            className="todo-push-bar__push-btn"
            onClick={handleCreateTodo}
            disabled={!todoInfo.title?.trim() || loading}
          >
            Add todo
          </Button>

          {mediaQuery({ min: 0, max: 768 }) && (
            <IconButton
              onClick={handleToggleExpandSettings}
              color={todoInfo.color}
              className="todo-push-bar__expand-advanced-setting-btn"
            >
              <TrippleDotIcon />
            </IconButton>
          )}

        </div>
      </div>
      <div className={`todo-push-bar__advanced-setting ${expandedSettings ? 'expanded' : ''}`}>
        <ColorPicker
          className="todo-push-bar__color-picker"
          {...getFieldProps('color')}
        />
      </div>
    </Paper>
  );
};

export default memo(TodoPushBar);
