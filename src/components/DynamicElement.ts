import {
  AllHTMLAttributes, createElement, forwardRef,
} from 'react';

interface DynamicElementProps extends AllHTMLAttributes<HTMLElement> {
  element?: keyof HTMLElementTagNameMap
}

const DynamicElement = forwardRef<HTMLElement, DynamicElementProps>((props, ref) => {
  const {
    element = 'div',
    children,
    ...restProps
  } = props;

  return createElement(
    element,
    { ref, ...restProps },
    children,
  );
});

export default DynamicElement;
