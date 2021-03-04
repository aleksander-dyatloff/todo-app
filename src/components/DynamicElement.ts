import { AllHTMLAttributes, createElement, FC } from 'react';

interface DynamicElementProps extends AllHTMLAttributes<HTMLElement> {
  element?: keyof HTMLElementTagNameMap
}

const DynamicElement: FC<DynamicElementProps> = (props) => {
  const {
    element = 'div',
    children,
    ...restProps
  } = props;

  return createElement(
    element,
    restProps,
    children,
  );
};

export default DynamicElement;
