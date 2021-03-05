import { AllHTMLAttributes, FC } from 'react';
import { CSSTransition } from 'react-transition-group';

interface ProgressProps extends AllHTMLAttributes<HTMLElement> {
  visible: boolean
}

const Progress: FC<ProgressProps> = ({ visible, className = '', ...restProps }) => (
  <CSSTransition
    unmountOnExit
    in={visible}
    timeout={250}
    classNames="progress"
  >
    <div
      className={`progress ${className}`}
      {...restProps}
    >
      <div className="progress__thumb" />
    </div>
  </CSSTransition>
);

export default Progress;
