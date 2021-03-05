import { AllHTMLAttributes, FC } from 'react';
import '@components/Typography.scss';
import { TextTransform, TypographyElementName } from '@utils/types';
import DynamicElement from '@components/DynamicElement';

interface TypographyProps extends AllHTMLAttributes<HTMLElement> {
  variant?: TypographyElementName
  transform?: TextTransform
}

const Typography: FC<TypographyProps> = (props) => {
  const {
    variant = 'p',
    transform = '',
    className = '',
    children,
    ...restProps
  } = props;

  return (
    <DynamicElement
      className={`typography ${transform} ${variant} ${className}`}
      element={variant}
      {...restProps}
    >
      {children}
    </DynamicElement>
  );
};

export default Typography;
