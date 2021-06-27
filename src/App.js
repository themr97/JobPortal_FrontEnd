import { Route, Switch } from 'react-router-dom';
import Navigation from './Components/Navbar'
import Home from './Components/Home'
import Signup from './Components/Signup';
import './App.css';
import Logout from './Components/Logout';
import CreateJob from './Components/Recruiter/CreateJob';
import MyJobs from './Components/Recruiter/MyJobs';
import Jobs from './Components/Applicant/Jobs';
import ViewApplicants from './Components/Recruiter/ViewApplicants';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/createjob' component={CreateJob} exact />
        <Route path='/myjobs' component={MyJobs} exact />
        <Route path='/jobs' component={Jobs} exact />
        <Route exact path="/job/applications/:jobId">
          <ViewApplicants />
        </Route>
        <Route path='/logout' component={Logout} exact />
      </Switch>
    </>
  );
}

export default App;
