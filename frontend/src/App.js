
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account'
import ErreurPage from './components/ErreurPage';
import { useSelector, useDispatch } from 'react-redux';



export default function App() {
  const connected = useSelector(state => state.connectedReducer.connected)
  const dispatch = useDispatch()
  if (!connected && localStorage.getItem('token')) {
    dispatch({ type: 'connected' })
  }
  return (

    <Router className="App">

      <Switch>
        <Route path="/" exact component={Login} />
        {connected === true && <Route path="/home" component={Home} />}
        {connected === true && <Route path="/account" component={Account} />}
        <Route component={ErreurPage} />
      </Switch>



    </Router>

  );
}


