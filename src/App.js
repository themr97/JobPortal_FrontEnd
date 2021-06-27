import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './Components/Navbar'
import Home from './Components/Home'
import Signup from './Components/Signup';
import './App.css';
import Logout from './Components/Logout';
import CreateJob from './Components/Recruiter/CreateJob';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/createjob' component={CreateJob} exact />
        <Route path='/logout' component={Logout} exact />
      </Switch>
    </>
  );
}

export default App;
