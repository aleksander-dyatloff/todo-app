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
import Ticker from './Ticker';
import TodoBody from './TodoBody';
import Progress from './Progress';

interface TodoItemProps {
  todo: Todo
  expanded: boolean
  expandTodo: MouseEventHandler
  closeTodo: MouseEventHandler
  index: number
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const {
    todo,
    expanded,
    expandTodo,
    closeTodo,
    index,
  } = props;

  const dispatch = useDispatch();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [checked, setChecked] = useState(todo.isDone);

  const handleCheckTodo = useCallback(() => {
    setChecked((prevState) => !prevState);

    dispatch(updateTodo({
      id: todo.id,
      isDone: !todo.isDone,
    }));
  }, [dispatch, todo.id, todo.isDone]);

  const handleDeleteTodo = useCallback(() => {
    setDeleteLoading(true);

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
          disabled={deleteLoading}
          color={todo.color}
          className="todo-item__checkbox"
          checked={checked}
        />
        <Ticker
          enable={expanded}
          className="todo-item__ticker"
        >
          <Typography
            onClick={handleCheckTodo}
            className={`todo-item__title ${checked ? 'done' : ''}`}
            variant="h6"
          >
            {todo.title}
          </Typography>
        </Ticker>
        <IconButton
          className="todo-item__expand-btn todo-item__btn"
          onClick={expanded ? closeTodo : expandTodo}
          name={String(todo.id)}
          aria-label="expand todo"
        >
          <ArrowIcon direction={expanded ? 'top' : 'bottom'} />
        </IconButton>
        <IconButton
          className="todo-item__btn todo-item__delete-btn"
          onClick={handleDeleteTodo}
          disabled={deleteLoading}
          aria-label="delete todo"
        >
          <CloseIcon />
          <Progress
            className="todo-item__delete-progress"
            visible={deleteLoading}
          />
        </IconButton>
      </div>
      <TodoBody
        todo={todo}
        expanded={expanded}
      />
    </Paper>
  );
};

export default memo(TodoItem);
