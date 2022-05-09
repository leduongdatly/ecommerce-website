import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import "./assets/fonts/fontawesome/css/all.min.css";
import "./sass/index.scss";
import { UserAuthContext } from './context/UserAuthContext';

ReactDOM.render(
  <BrowserRouter>
    <UserAuthContext>
      <Provider store={store}>
        <App />
      </Provider>
    </UserAuthContext>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();