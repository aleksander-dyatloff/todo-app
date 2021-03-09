import { AllHTMLAttributes, FC } from 'react';
import DynamicElement from '@components/DynamicElement';

interface PaperProps extends AllHTMLAttributes<HTMLElement> {
  element?: keyof HTMLElementTagNameMap
}

const Paper: FC<PaperProps> = (props) => {
  const {
    element = 'div',
    className = '',
    children,
    ...restProps
  } = props;

  return (
    <DynamicElement
      className={`paper secondary ${className}`}
      element={element}
      {...restProps}
    >
      {children}
    </DynamicElement>
  );
};

export default Paper;
