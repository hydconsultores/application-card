import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'antd/dist/antd.css';

import App from './pages/web';
import { createBrowserHistory } from 'history'
import * as serviceWorker from "./serviceWorker";
import "../src/styles/css.css"; 
import Header from './pages/web/header';
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
         <Switch>
            <Route exact component={App} />
         </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  
  document.getElementById('root')
);

export const history = createBrowserHistory();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();