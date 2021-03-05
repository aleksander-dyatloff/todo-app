import { Todo } from '@utils/types';
import {
  FC, memo, MouseEventHandler, useCallback, useState,
} from 'react';
import TodoItem from '@components/TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Progress from '@components/Progress';

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

  return (
    <TransitionGroup
      className="todos-list"
    >
      <Progress
        className="todos-list__progress"
        visible={loading}
      />
      {todos.map((todo, index) => (
        <CSSTransition
          key={todo.id}
          classNames="todo-item"
          timeout={250}
        >
          <TodoItem
            expanded={expandedTodo === todo.id}
            expandTodo={handleExpandTodo}
            todo={todo}
            index={index}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default memo(TodosList);
