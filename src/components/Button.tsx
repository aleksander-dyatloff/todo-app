import {
  AllHTMLAttributes, FC, MouseEventHandler, useCallback, useState,
} from 'react';
import '@components/Button.scss';
import { ButtonTypes } from '@utils/types';

interface ButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes
}

interface Ripple {
  readonly id: number
  x: number
  y: number
  size: number
}

let rippleMaxId = 0;

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className = '',
    onMouseDown,
    ...restProps
  } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleCreateRipple: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (onMouseDown) onMouseDown(e);

    const rippleContainer = e.currentTarget.getBoundingClientRect();

    const size = rippleContainer.width > rippleContainer.height
      ? rippleContainer.width
      : rippleContainer.height;

    const x = e.pageX - rippleContainer.left - size / 2;
    const y = e.pageY - rippleContainer.top - size / 2;

    const newRipple: Ripple = {
      id: rippleMaxId++, x, y, size,
    };

    setRipples((prevRipples) => ([...prevRipples, newRipple]));

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple !== newRipple));
    }, 850);
  }, [onMouseDown]);

  return (
    <button
      onMouseDown={handleCreateRipple}
      className={`button ${className}`}
      {...restProps}
    >
      {children}
      <div className="button__ripple-container">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="button__ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default Button;
