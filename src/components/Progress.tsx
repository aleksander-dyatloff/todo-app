import { AppColor } from '@utils/types';
import { AllHTMLAttributes, FC } from 'react';
import { CSSTransition } from 'react-transition-group';

interface ProgressProps extends AllHTMLAttributes<HTMLElement> {
  visible: boolean
  variant?: 'linear' | 'circular'
  color?: AppColor
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    visible,
    className = '',
    color = 'primary',
    variant = 'circular',
    ...restProps
  } = props;

  return (
    <CSSTransition
      unmountOnExit
      in={visible}
      timeout={300}
      classNames="progress"
    >
      <div
        className={`progress ${color} ${variant} ${className}`}
        {...restProps}
      >
        <div className="progress__track">
          {variant === 'linear' && <span className="progress__thumb" />}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Progress;
