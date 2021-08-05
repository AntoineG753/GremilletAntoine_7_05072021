import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import store from './components/redux/Store';


ReactDOM.render(<Provider store={store}> <App /> </Provider>,document.getElementById('root')); 
 
reportWebVitals();
