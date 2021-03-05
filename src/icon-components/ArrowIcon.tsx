import { FC } from 'react';
import '@icons/ArrowIcon.scss';

interface ArrowIconProps {
  direction: 'top' | 'right' | 'bottom' | 'left'
}

const ArrowIcon: FC<ArrowIconProps> = ({ direction }) => (
  <svg
    className={`icon arrow-icon ${direction}`}
    focusable="false"
    viewBox="-2 -2 28 28"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
  </svg>
);

export default ArrowIcon;
