import { AllHTMLAttributes, FC } from 'react';
import { AppColor, ButtonTypes } from '@utils/types';
import Button from '@components/Button';

interface IconButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes
  duration?: number
  color?: AppColor
}

const IconButton: FC<IconButtonProps> = (props) => {
  const {
    children,
    className = '',
    color = 'secondary',
    ...restProps
  } = props;

  return (
    <Button
      color={color}
      className={`icon-button ${className}`}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default IconButton;
