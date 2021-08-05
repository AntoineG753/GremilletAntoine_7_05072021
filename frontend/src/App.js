
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ErreurPage from './components/ErreurPage';
import { useSelector, useDispatch} from 'react-redux';



export default function App() {
  
  const connected = useSelector(state => state.connectedReducer.connected)

  const dispatch = useDispatch()
if (!connected && localStorage.getItem('token')) {
  console.log("on remet true")
  dispatch({ type: 'connected' })
}
    return (
      console.log(connected),
      <Router className="App">

        <Switch>
          <Route path="/" exact component={Login}/>
          {connected === true && <Route path="/home" component={Home}/> }
          <Route component={ErreurPage}/>
        </Switch>



      </Router>
      
    );
  }
  

