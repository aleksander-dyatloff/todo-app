import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from '@components/App';

const root = document.getElementById('root');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

render(app, root);
