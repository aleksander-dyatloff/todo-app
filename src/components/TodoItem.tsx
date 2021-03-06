import { Todo } from '@utils/types';
import {
  FC, memo, MouseEventHandler, useCallback, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@components/Paper';
import CheckBox from '@components/CheckBox';
import Typography from '@components/Typography';
import IconButton from '@components/IconButton';
import CloseIcon from '@icons/CloseIcon';
import ArrowIcon from '@icons/ArrowIcon';
import { deleteTodo, updateTodo } from '@redux/TodosSlice';

interface TodoItemProps {
  todo: Todo
  expanded: boolean
  expandTodo: MouseEventHandler
  index: number
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const {
    todo,
    expanded,
    expandTodo,
    index,
  } = props;

  const dispatch = useDispatch();

  const [checked, setChecked] = useState(todo.isDone);

  const handleCheckTodo = useCallback(() => {
    setChecked((prevState) => !prevState);
    dispatch(updateTodo({
      id: todo.id,
      isDone: !todo.isDone,
    }));
  }, [dispatch, todo.id, todo.isDone]);

  const handleDeleteTodo = useCallback(() => {
    dispatch(deleteTodo(todo.id));
  }, [dispatch, todo.id]);

  const todoItemStyles = useMemo(() => ({ transitionDelay: `${index * 25}ms` }), [index]);

  return (
    <Paper
      element="li"
      className="todo-item"
      style={todoItemStyles}
    >
      <div className={`todo-item__mark ${todo.color}`} />
      <div className="todo-item__header">
        <CheckBox
          onClick={handleCheckTodo}
          color={todo.color}
          className="todo-item__checkbox"
          checked={checked}
        />
        <Typography
          onClick={handleCheckTodo}
          className={`todo-item__title ${checked ? 'done' : ''}`}
          variant="h6"
        >
          {todo.title}
        </Typography>
        <IconButton
          className="todo-item__expand-btn todo-item__btn"
          onClick={expandTodo}
          name={String(todo.id)}
          aria-label="expand todo"
          title="Expand todo"
        >
          <ArrowIcon direction={expanded ? 'top' : 'bottom'} />
        </IconButton>
        <IconButton
          className="todo-item__btn"
          onClick={handleDeleteTodo}
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
