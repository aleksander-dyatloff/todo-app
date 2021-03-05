import { Todo } from '@utils/types';
import {
  FC, memo, MouseEventHandler, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@components/Paper';
import CheckBox from '@components/CheckBox';
import Typography from '@components/Typography';
import IconButton from '@components/IconButton';
import CloseIcon from '@icons/CloseIcon';
import ArrowIcon from '@icons/ArrowIcon';
import { updateTodo } from '@redux/TodosSlice';

interface TodoItemProps {
  todo: Todo
  expanded: boolean
  expandTodo: MouseEventHandler
}

const TodoItem: FC<TodoItemProps> = ({ todo, expanded, expandTodo }) => {
  const dispatch = useDispatch();

  const handleCheckTodo = useCallback(() => {
    const { id, isDone } = todo;

    dispatch(updateTodo({ id, isDone: !isDone }));
  }, [dispatch, todo]);

  return (
    <Paper
      element="li"
      className="todo-item"
    >
      <div className={`todo-item__mark ${todo.color}`} />
      <div className="todo-item__header">
        <CheckBox
          onClick={handleCheckTodo}
          color={todo.color}
          className="todo-item__checkbox"
          checked={todo.isDone}
        />
        <Typography
          onClick={handleCheckTodo}
          className="todo-item__title"
          variant="h6"
        >
          {todo.title}
        </Typography>
        <IconButton
          className="todo-item__expand-btn"
          onClick={expandTodo}
          name={String(todo.id)}
          aria-label="expand todo"
          title="Expand todo"
        >
          <ArrowIcon direction={expanded ? 'top' : 'bottom'} />
        </IconButton>
        <IconButton
          aria-label="delete todo"
          title="Delete todo"
        >
          <CloseIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default memo(TodoItem);
