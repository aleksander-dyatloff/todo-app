import { Todo } from '@utils/types';
import {
  FC, memo, MouseEventHandler, useCallback, useState,
} from 'react';
import TodoItem from '@components/TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Progress from '@components/Progress';
import Typography from './Typography';

interface TodosListProps {
  todos: Todo[]
  loading: boolean
}

const TodosList: FC<TodosListProps> = ({ todos, loading }) => {
  const [expandedTodo, setExpandedTodo] = useState<number | null>(null);

  const handleExpandTodo: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const newExpandedTodo = Number(e.currentTarget.name);

    setExpandedTodo(newExpandedTodo);
  }, []);

  const todoItems = todos.map((todo, index) => (
    <CSSTransition
      key={todo.id}
      classNames="todo-item"
      timeout={1000}
    >
      <TodoItem
        expanded={expandedTodo === todo.id}
        expandTodo={handleExpandTodo}
        todo={todo}
        index={index}
      />
    </CSSTransition>
  ));

  return (
    <>
      <Progress
        className="todos-list__progress"
        visible={loading}
      />
      <TransitionGroup
        className="todos-list"
        component="ul"
      >
        {todoItems}
      </TransitionGroup>
      {!todos.length && !loading && (
        <Typography
          className="todos-list__title"
          transform="uppercase"
          variant="h6"
        >
          No todos
        </Typography>
      )}
    </>
  );
};

export default memo(TodosList);
