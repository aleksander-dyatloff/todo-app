import {
  AllHTMLAttributes, FC, useLayoutEffect, useRef, useState,
} from 'react';
import DynamicElement from './DynamicElement';

interface TickerProps extends AllHTMLAttributes<HTMLElement> {
  enable: boolean
  element?: keyof HTMLElementTagNameMap
}

const Ticker: FC<TickerProps> = (props) => {
  const {
    enable,
    element,
    children,
    className = '',
    ...restProps
  } = props;

  const tickerRef = useRef<HTMLElement | null>(null);

  const [isScroll, setScroll] = useState(false);

  useLayoutEffect(() => {
    const ticker = tickerRef.current;

    if (enable && ticker && ticker.scrollWidth > ticker.clientWidth) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [enable]);

  return (
    <DynamicElement
      ref={tickerRef}
      element={element}
      className={`ticker ${isScroll ? 'scroll' : ''} ${className}`}
      {...restProps}
    >
      {isScroll ? [children, children] : children}
    </DynamicElement>
  );
};

export default Ticker;
