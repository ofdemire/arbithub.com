import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/createStore';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

