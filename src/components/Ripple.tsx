import {
  AllHTMLAttributes,
  FC, MouseEventHandler, useCallback, useState,
} from 'react';
import DynamicElement from '@components/DynamicElement';
import '@components/Ripple.scss';

interface RippleProps extends AllHTMLAttributes<HTMLElement> {
  element?: keyof HTMLElementTagNameMap
  duration?: number
}

interface RippleElem {
  readonly id: number
  x: number
  y: number
  size: number
}

let rippleMaxId = 0;

const Ripple: FC<RippleProps> = (props) => {
  const {
    children,
    element,
    duration = 850,
    className = '',
    onMouseDown,
    disabled,
    ...restProps
  } = props;

  const [ripples, setRipples] = useState<RippleElem[]>([]);

  const handleCreateRipple: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (onMouseDown) onMouseDown(e);

    const rippleContainer = e.currentTarget.getBoundingClientRect();

    const size = rippleContainer.width > rippleContainer.height
      ? rippleContainer.width
      : rippleContainer.height;

    const x = e.pageX - rippleContainer.left - size / 2;
    const y = e.pageY - rippleContainer.top - size / 2;

    const newRipple: RippleElem = {
      id: rippleMaxId++, x, y, size,
    };

    setRipples((prevRipples) => ([...prevRipples, newRipple]));

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((ripple) => ripple !== newRipple));
    }, duration);
  }, [onMouseDown, duration]);

  return (
    <DynamicElement
      className={`ripple ${className}`}
      onMouseDown={disabled ? undefined : handleCreateRipple}
      element={element}
      {...restProps}
    >
      {children}
      <div className="ripple__container">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple__elem"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              animationDuration: `${duration}ms`,
            }}
          />
        ))}
      </div>
    </DynamicElement>
  );
};

export default Ripple;
