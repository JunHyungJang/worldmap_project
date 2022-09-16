import React from 'react';
import {Route, Routes, Router} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
// import Title from './components/views/Title/Title'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';


import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
// import Reducer from './_reducers'

const createStorewithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store= {createStorewithMiddleware(Reducer,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__())}>
  /* // <Provider store = {store}>  */
  <App/>
  /* // <WorldMap/>  */
  // </Provider>
);
