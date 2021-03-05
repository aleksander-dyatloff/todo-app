import { Todo } from '@utils/types';
import {
  FC, memo, MouseEventHandler, useCallback, useState,
} from 'react';
import TodoItem from '@components/TodoItem';

interface TodosListProps {
  todos: Todo[]
  loading: boolean
}

const TodosList: FC<TodosListProps> = ({ todos }) => {
  const [expandedTodo, setExpandedTodo] = useState<number | null>(null);

  const handleExpandTodo: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const newExpandedTodo = Number(e.currentTarget.name);

    setExpandedTodo(newExpandedTodo);
  }, []);

  return (
    <ul className="todos-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          expanded={expandedTodo === todo.id}
          expandTodo={handleExpandTodo}
          todo={todo}
        />
      ))}
    </ul>
  );
};

export default memo(TodosList);
