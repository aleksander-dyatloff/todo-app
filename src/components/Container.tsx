import { FC } from 'react';

const Container: FC = ({ children, ...restProps }) => (
  <div className="container" {...restProps}>{children}</div>
);

export default Container;
