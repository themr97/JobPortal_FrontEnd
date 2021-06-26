import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './Components/Navbar'
import Home from './Components/Home'
import Signup from './Components/Signup';
import './App.css';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signup' component={Signup} exact />
      </Switch>
    </>
  );
}

export default App;
