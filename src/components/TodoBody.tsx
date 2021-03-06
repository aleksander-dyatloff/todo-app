import { Todo } from '@utils/types';
import { FC, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import Divider from './Divider';
import Typography from './Typography';

interface TodoBodyProps {
  todo: Todo
  expanded: boolean
}

const TodoBody: FC<TodoBodyProps> = ({ todo, expanded }) => (
  <CSSTransition
    in={expanded}
    timeout={300}
    unmountOnExit
    classNames="todo-body"
  >
    <div className="todo-item__body todo-body">
      <Divider className="todo-body__divider" />
      <Typography>{todo.description}</Typography>
    </div>
  </CSSTransition>
);

export default memo(TodoBody);
