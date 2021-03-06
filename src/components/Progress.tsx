import { AllHTMLAttributes, FC } from 'react';
import { CSSTransition } from 'react-transition-group';

interface ProgressProps extends AllHTMLAttributes<HTMLElement> {
  visible: boolean
  variant?: 'linear' | 'circular'
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    visible,
    className = '',
    variant = 'circular',
    ...restProps
  } = props;

  return (
    <CSSTransition
      unmountOnExit
      in={visible}
      timeout={250}
      classNames="progress"
    >
      <div
        className={`progress ${variant} ${className}`}
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
