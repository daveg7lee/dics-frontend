import React from 'react';
import './Styles/index.css';
import ReactDOM from 'react-dom';
import App from './Components/App';
import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
