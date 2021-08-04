import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<React.StrictMode> <App /> </React.StrictMode>,document.getElementById('root'));  // on dit que le app dans app.js vas s'afficher dans la class root du index.html
 
reportWebVitals();
