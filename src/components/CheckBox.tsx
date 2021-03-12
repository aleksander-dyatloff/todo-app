import {
  AllHTMLAttributes, FC, MouseEventHandler, useCallback,
} from 'react';
import { ButtonTypes, Color } from '@utils/types';
import CheckIcon from '@icons/CheckIcon';
import IconButton from '@components/IconButton';

interface CheckBoxProps extends AllHTMLAttributes<HTMLElement> {
  type?: ButtonTypes
  color?: Color
}

const CheckBox: FC<CheckBoxProps> = (props) => {
  const {
    checked = false,
    color = 'primary',
    onChange,
    onClick,
    className = '',
    ...restProps
  } = props;

  const handleCheckBoxClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const expandedEvent = {
      ...e,
      target: {
        ...e.target,
        name: e.currentTarget.name,
        value: !checked,
      },
    };

    if (onClick) onClick(expandedEvent);
    if (onChange) onChange(expandedEvent);
  }, [onClick, onChange, checked]);

  return (
    <IconButton
      onClick={handleCheckBoxClick}
      data-checked={checked}
      role="checkbox"
      aria-checked={checked}
      className={`checkbox ${color} ${className}`}
      {...restProps}
    >
      <CheckIcon />
    </IconButton>
  );
};

export default CheckBox;
