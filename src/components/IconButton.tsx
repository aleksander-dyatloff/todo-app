import { AllHTMLAttributes, FC } from 'react';
import '@components/IconButton.scss';
import { ButtonTypes } from '@utils/types';
import Button from '@components/Button';

interface IconButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes
}

const IconButton: FC<IconButtonProps> = (props) => {
  const {
    children,
    className = '',
    ...restProps
  } = props;

  return (
    <Button
      className={`icon-button ${className}`}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default IconButton;
