import { AllHTMLAttributes, FC } from 'react';
import '@components/Paper.scss';
import DynamicElement from '@components/DynamicElement';

interface PaperProps extends AllHTMLAttributes<HTMLElement> {
  element?: keyof HTMLElementTagNameMap
}

const Paper: FC<PaperProps> = (props) => {
  const {
    element = 'div',
    children,
    ...restProps
  } = props;

  return (
    <DynamicElement
      className="paper"
      element={element}
      {...restProps}
    >
      {children}
    </DynamicElement>
  );
};

export default Paper;
