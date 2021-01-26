import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from "react-router-dom";
import history from "./history";

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
); /**/