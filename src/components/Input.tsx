import {
  AllHTMLAttributes, FC, MouseEventHandler, useCallback,
} from 'react';
import '@components/Input.scss';
import Ripple from '@components/Ripple';
import DynamicElement from './DynamicElement';

interface InputProps extends AllHTMLAttributes<HTMLElement> {
  variant?: 'input' | 'textarea'
}

const Input: FC<InputProps> = (props) => {
  const {
    variant = 'input',
    className = '',
    value,
    disabled,
    ...restProps
  } = props;

  const handleInputFocus: MouseEventHandler<HTMLElement> = useCallback((e) => {
    const input: HTMLInputElement | null = e.currentTarget.querySelector('.input > .input__elem');

    if (input) input.focus();
  }, []);

  return (
    <Ripple
      onClick={handleInputFocus}
      className="input"
      disabled={disabled}
      data-disabled={disabled}
    >
      <DynamicElement
        disabled={disabled}
        element={variant}
        className={`input__elem ${className}`}
        value={value}
        {...restProps}
      />
    </Ripple>
  );
};

export default Input;
