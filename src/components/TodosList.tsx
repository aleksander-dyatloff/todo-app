import { Todo } from '@utils/types';
import { FC, memo, useState } from 'react';
import TodoItem from '@components/TodoItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Progress from '@components/Progress';
import Typography from '@components/Typography';

interface TodosListProps {
  todos: Todo[]
  loading: boolean
}

const TodosList: FC<TodosListProps> = ({ todos, loading }) => {
  const [expandedTodo, setExpandedTodo] = useState<number | null>(null);

  const [chaningTodo, setChangingTodo] = useState<number | null>(null);

  const todoItems = todos.map((todo, index) => (
    <CSSTransition
      key={todo.id}
      classNames="todo-item"
      timeout={1000}
    >
      <TodoItem
        expanded={expandedTodo === todo.id}
        changing={chaningTodo === todo.id}
        setChangingTodo={setChangingTodo}
        setExpandedTodo={setExpandedTodo}
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
