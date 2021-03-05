import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '@src/index.scss';
import App from '@components/App';
import store from '@redux/store';

const root = document.getElementById('root');

const app = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

render(app, root);
