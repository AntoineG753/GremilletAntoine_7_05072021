import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';



class App extends Component {

  render () {
    return (
      <div className="App">

        <header>
          <h1 className='titreh1_app'>GROUPOMANIA</h1>
        </header>

        
        <Login />
        

      </div>
    );
  }
  
}

export default App;
