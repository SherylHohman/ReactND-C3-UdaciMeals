import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
