import { AllHTMLAttributes, FC } from 'react';
import '@components/Button.scss';
import { ButtonTypes } from '@utils/types';
import Ripple from '@components/Ripple';

interface ButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes
  duration?: number
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className = '',
    ...restProps
  } = props;

  return (
    <Ripple
      element="button"
      className={`button ${className}`}
      {...restProps}
    >
      {children}
    </Ripple>
  );
};

export default Button;
