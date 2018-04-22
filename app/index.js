import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import pcTransferApp from './reducers';
import thunk from 'redux-thunk';

import './app.global.css';

let store = createStore(pcTransferApp, compose(
  window.devToolsExtension
  ? window.devToolsExtension()
  : f => f), applyMiddleware(thunk));

render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));

export { store };