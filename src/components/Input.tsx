import { AllHTMLAttributes, FC } from 'react';
import Ripple from '@components/Ripple';
import DynamicElement from '@components/DynamicElement';

interface InputProps extends AllHTMLAttributes<HTMLElement> {
  variant?: 'input' | 'textarea'
}

const Input: FC<InputProps> = (props) => {
  const {
    variant = 'input',
    className = '',
    value,
    disabled,
    readOnly,
    ...restProps
  } = props;

  return (
    <Ripple
      className={`input ${readOnly ? 'readonly' : ''} ${className}`}
      disabled={disabled}
      data-disabled={disabled}
    >
      <DynamicElement
        disabled={disabled}
        element={variant}
        className="input__elem"
        value={value}
        readOnly={readOnly}
        {...restProps}
      />
    </Ripple>
  );
};

export default Input;
