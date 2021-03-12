import PencilIcon from '@icons/PencilIcon';
import { Todo, TodoValues } from '@utils/types';
import {
  FC, memo, MouseEventHandler, useCallback, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import Divider from '@components/Divider';
import IconButton from '@components/IconButton';
import Input from '@components/Input';
import Typography from '@components/Typography';
import { useDispatch } from 'react-redux';
import { updateTodo } from '@redux/TodosSlice';
import CheckIcon from '@icons/CheckIcon';
import Progress from './Progress';

interface TodoBodyProps {
  todo: Todo
  todoInfo: TodoValues
  expanded: boolean
  changing: boolean
  changeTodo: MouseEventHandler
  closeChangeTodo: MouseEventHandler
  getFieldProps: any
}

const TodoBody: FC<TodoBodyProps> = (props) => {
  const {
    todo,
    expanded,
    changeTodo,
    closeChangeTodo,
    changing,
    getFieldProps,
    todoInfo,
  } = props;

  const dispatch = useDispatch();

  const [updateLoading, setUpdateLoading] = useState(false);

  const handleActivateEditorMode: MouseEventHandler = useCallback((e) => {
    changeTodo(e);
  }, [changeTodo]);

  const dispatchUpdateTodo: MouseEventHandler = useCallback(async (e) => {
    setUpdateLoading(true);

    await dispatch(updateTodo({ id: todo.id, ...todoInfo }));

    setUpdateLoading(false);
    closeChangeTodo(e);
  }, [closeChangeTodo, dispatch, todo.id, todoInfo]);

  return (
    <CSSTransition
      in={expanded}
      timeout={300}
      unmountOnExit
      classNames="todo-body"
    >
      <div className="todo-item__body todo-body">
        <IconButton
          disabled={!todoInfo.title?.trim()}
          onClick={changing ? dispatchUpdateTodo : handleActivateEditorMode}
          aria-label="edit todo"
          className="todo-body__update-btn"
        >
          <Progress
            className="todo-body__update-progress"
            visible={updateLoading}
          />
          {changing ? <CheckIcon /> : <PencilIcon />}
        </IconButton>
        <Divider className="todo-body__divider" />
        <div className={`todo-body__description-wrapper ${changing ? 'edit' : ''}`}>

          {changing ? (
            <Input
              className="todo-body__description-input"
              placeholder="Todo description..."
              variant="textarea"
              {...getFieldProps('description')}
            />
          ) : (
            <Typography
              className="todo-body__description"
            >
              {todo.description ? todo.description : 'No description'}
            </Typography>
          )}

        </div>
      </div>
    </CSSTransition>
  );
};

export default memo(TodoBody);
