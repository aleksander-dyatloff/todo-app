import { Color } from '@utils/types';
import {
  AllHTMLAttributes, FC, FormEventHandler, MouseEventHandler, useCallback,
} from 'react';
import IconButton from '@components/IconButton';
import Paper from '@components/Paper';

interface ColorPickerProps extends AllHTMLAttributes<HTMLButtonElement> {
  value: Color
  onChange: FormEventHandler<HTMLButtonElement>
}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const {
    value = 'blue',
    name,
    onChange,
    className = '',
    ...restProps
  } = props;

  const handleChangeColor: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const newColor = e.currentTarget.name;

    const expandedEvent = {
      ...e,
      target: {
        value: newColor,
        name,
        ...e.target,
      },
    };

    if (onChange) onChange(expandedEvent);
  }, [onChange, name]);

  return (
    <Paper
      className={`color-picker ${className}`}
      {...restProps}
    >
      <IconButton
        className={`color-picker__color blue ${value === 'blue' ? 'active' : ''}`}
        onClick={handleChangeColor}
        name="blue"
      />
      <IconButton
        className={`color-picker__color red ${value === 'red' ? 'active' : ''}`}
        onClick={handleChangeColor}
        name="red"
      />
      <IconButton
        className={`color-picker__color green ${value === 'green' ? 'active' : ''}`}
        onClick={handleChangeColor}
        name="green"
      />
    </Paper>
  );
};

export default ColorPicker;
