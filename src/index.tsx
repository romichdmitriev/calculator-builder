import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// store
import { store } from '@store/index';

// components
import App from '@components/App';

// styles
import '@styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
