import CloseIcon from '@icons/CloseIcon';
import { TodoValues } from '@utils/types';
import {
  Dispatch, FC, memo, SetStateAction, useCallback,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import CheckBox from './CheckBox';
import ColorPicker from './ColorPicker';
import IconButton from './IconButton';
import Paper from './Paper';
import Typography from './Typography';

interface TodosFilterProps {
  filterTodos: Dispatch<SetStateAction<TodoValues>>
  filterValues: TodoValues
}

const TodosFilter: FC<TodosFilterProps> = (props) => {
  const { filterTodos, filterValues } = props;

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;

    filterTodos((prevFilter) => ({ ...prevFilter, [name]: value }));
  }, [filterTodos]);

  const handleResetFilter = useCallback(() => {
    filterTodos({});
  }, [filterTodos]);

  return (
    <Paper className="todos-filter">
      <CSSTransition
        in={Boolean(filterValues.color || filterValues.isDone)}
        timeout={250}
        unmountOnExit
        classNames="todos-filter__reset-icon-btn"
      >
        <IconButton
          className="todos-filter__reset-icon-btn"
          aria-label="clear todos filter"
          onClick={handleResetFilter}
        >
          <CloseIcon />
        </IconButton>
      </CSSTransition>
      <ColorPicker
        className="todos-filter__color-picker"
        value={filterValues.color ?? ''}
        onChange={handleFilterChange}
        name="color"
      />
      <Typography variant="h6">Checked:</Typography>
      <CheckBox
        className="todos-filter__checkbox"
        checked={filterValues.isDone}
        onChange={handleFilterChange}
        name="isDone"
      />
    </Paper>
  );
};

export default memo(TodosFilter);
