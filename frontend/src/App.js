import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useSelector} from 'react-redux';
// import {useselector} from 'redux';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ErreurPage from './components/ErreurPage';
import store from './components/redux/Redux';

export default function App() {

      
    return (
      console.log(store.getState().connected),
      <Router className="App">

        <Switch>
          <Route path="/" exact component={Login}/>
          {store.getState().connected = "true" && <Route path="/home" component={Home}/> }
          <Route component={ErreurPage}/>
        </Switch>



      </Router>
      
    );
  }
  

