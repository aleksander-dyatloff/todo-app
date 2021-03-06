import { AllHTMLAttributes, FC } from 'react';
import { AppColor, ButtonTypes } from '@utils/types';
import Ripple from '@components/Ripple';

interface ButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  color?: AppColor
  type?: ButtonTypes
  duration?: number
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className = '',
    color = 'primary',
    ...restProps
  } = props;

  return (
    <Ripple
      element="button"
      className={`button ${color} ${className}`}
      {...restProps}
    >
      {children}
    </Ripple>
  );
};

export default Button;
