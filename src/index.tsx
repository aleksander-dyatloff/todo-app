import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '@src/index.scss';
import App from '@components/App';
import store from '@redux/store';

const root = document.getElementById('root');

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, root);
