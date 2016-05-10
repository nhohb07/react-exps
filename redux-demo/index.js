import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router/routes';
// redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
// styles
import './index.css';   

// Setting up entire state 'schema' at inception
const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <Routes />
  </Provider>,
  document.getElementById('root')
);