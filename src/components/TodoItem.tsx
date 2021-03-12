import { Todo, TodoValues } from '@utils/types';
import {
  Dispatch,
  FC, memo, MouseEventHandler, SetStateAction, useCallback, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@components/Paper';
import { deleteTodo, updateTodo } from '@redux/TodosSlice';
import { useFormik } from 'formik';
import TodoBody from '@components/TodoBody';
import TodoHeader from '@components/TodoHeader';

interface TodoItemProps {
  todo: Todo
  expanded: boolean
  changing: boolean
  setChangingTodo: Dispatch<SetStateAction<number | null>>
  setExpandedTodo: Dispatch<SetStateAction<number | null>>
  index: number
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const {
    todo,
    expanded,
    changing,
    setChangingTodo,
    setExpandedTodo,
    index,
  } = props;

  const dispatch = useDispatch();

  const { values: todoInfo, getFieldProps } = useFormik({
    onSubmit: () => {},
    initialValues: {
      title: todo.title,
      description: todo.description,
      color: todo.color,
    } as TodoValues,
  });

  const expandTodo: MouseEventHandler = useCallback(() => {
    setExpandedTodo(todo.id);
    setChangingTodo(null);
  }, [todo.id, setExpandedTodo, setChangingTodo]);

  const closeTodo: MouseEventHandler = useCallback(() => {
    setExpandedTodo(null);
  }, [setExpandedTodo]);

  const changeTodo: MouseEventHandler = useCallback(() => {
    setChangingTodo(todo.id);
  }, [todo.id, setChangingTodo]);

  const closeChangeTodo: MouseEventHandler = useCallback(() => {
    setChangingTodo(null);
  }, [setChangingTodo]);

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
      <TodoHeader
        todo={todo}
        expanded={expanded}
        isChecked={checked}
        changing={changing}
        deleteLoading={deleteLoading}
        checkTodo={handleCheckTodo}
        expandTodo={expandTodo}
        closeTodo={closeTodo}
        deleteTodo={handleDeleteTodo}
        getFieldProps={getFieldProps}
      />
      <TodoBody
        todo={todo}
        todoInfo={todoInfo}
        expanded={expanded}
        changeTodo={changeTodo}
        closeChangeTodo={closeChangeTodo}
        changing={changing}
        getFieldProps={getFieldProps}
      />
    </Paper>
  );
};

export default memo(TodoItem);
