import { Todo } from '@utils/types';
import { FC, memo, MouseEventHandler } from 'react';
import CheckBox from '@components/CheckBox';
import Input from '@components/Input';
import Ticker from '@components/Ticker';
import Typography from '@components/Typography';
import IconButton from '@components/IconButton';
import ArrowIcon from '@icons/ArrowIcon';
import CloseIcon from '@icons/CloseIcon';
import Progress from '@components/Progress';

interface TodoHeaderProps {
  todo: Todo
  checkTodo: MouseEventHandler
  expandTodo: MouseEventHandler
  closeTodo: MouseEventHandler
  deleteTodo: MouseEventHandler
  getFieldProps: any
  isChecked: boolean
  expanded: boolean
  changing: boolean
  deleteLoading: boolean
}

const TodoHeader: FC<TodoHeaderProps> = (props) => {
  const {
    todo,
    expanded,
    changing,
    deleteLoading,
    isChecked,
    expandTodo,
    closeTodo,
    deleteTodo,
    checkTodo,
    getFieldProps,
  } = props;

  return (
    <div className="todo-item__header todo-header">
      <CheckBox
        onClick={checkTodo}
        disabled={deleteLoading || changing}
        color={todo.color}
        className="todo-header__checkbox"
        checked={isChecked}
      />
      <div className={`todo-header__title-wrapper ${changing ? 'edit' : ''}`}>

        {changing ? (
          <Input
            autoComplete="off"
            className="todo-header__title-input"
            placeholder="Todo title..."
            {...getFieldProps('title')}
          />
        ) : (
          <Ticker
            enable={expanded}
            className="todo-header__ticker"
          >
            <Typography
              onClick={checkTodo}
              className={`todo-header__title ${isChecked ? 'done' : ''}`}
              variant="h6"
            >
              {todo.title}
            </Typography>
          </Ticker>
        )}

      </div>
      <IconButton
        className="todo-header__expand-btn todo-item__btn"
        onClick={expanded ? closeTodo : expandTodo}
        name={String(todo.id)}
        aria-label="expand todo"
        disabled={changing}
      >
        <ArrowIcon direction={expanded ? 'top' : 'bottom'} />
      </IconButton>
      <IconButton
        className="todo-item__btn todo-header__delete-btn"
        onClick={deleteTodo}
        disabled={deleteLoading || changing}
        aria-label="delete todo"
      >
        <CloseIcon />
        <Progress
          className="todo-header__delete-progress"
          visible={deleteLoading}
        />
      </IconButton>
    </div>
  );
};

export default memo(TodoHeader);
