import { AllHTMLAttributes, FC } from 'react';

interface DividerProps extends AllHTMLAttributes<HTMLDivElement> {
  variant?: 'vertical' | 'horizontal'
}

const Divider: FC<DividerProps> = ({ variant = 'horizontal', className = '', ...restProps }) => (
  <div
    className={`divider ${variant} ${className}`}
    {...restProps}
  />
);

export default Divider;
