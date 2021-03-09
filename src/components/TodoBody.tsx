import PencilIcon from '@icons/PencilIcon';
import { Todo, TodoValues } from '@utils/types';
import {
  Dispatch, FC, memo, SetStateAction, useCallback, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import Divider from '@components/Divider';
import IconButton from '@components/IconButton';
import Input from '@components/Input';
import Typography from '@components/Typography';
import { useDispatch } from 'react-redux';
import { updateTodo } from '@redux/TodosSlice';
import Progress from './Progress';

interface TodoBodyProps {
  todo: Todo
  todoInfo: TodoValues
  expanded: boolean
  setEditorMode: Dispatch<SetStateAction<boolean>>
  editorMode: boolean
  getFieldProps: any
}

const TodoBody: FC<TodoBodyProps> = (props) => {
  const {
    todo,
    expanded,
    setEditorMode,
    editorMode,
    getFieldProps,
    todoInfo,
  } = props;

  const dispatch = useDispatch();

  const [updateLoading, setUpdateLoading] = useState(false);

  const handleActivateEditorMode = useCallback(() => {
    setEditorMode(true);
  }, [setEditorMode]);

  const dispatchUpdateTodo = useCallback(async () => {
    setUpdateLoading(true);

    await dispatch(updateTodo({ id: todo.id, ...todoInfo }));

    setUpdateLoading(false);
    setEditorMode(false);
  }, [setEditorMode, dispatch, todo.id, todoInfo]);

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
          onClick={editorMode ? dispatchUpdateTodo : handleActivateEditorMode}
          aria-label="edit todo"
          className="todo-body__update-btn"
        >
          <Progress
            className="todo-body__update-progress"
            visible={updateLoading}
          />
          <PencilIcon />
        </IconButton>
        <Divider className="todo-body__divider" />

        {editorMode ? (
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
    </CSSTransition>
  );
};

export default memo(TodoBody);
