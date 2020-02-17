import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Redirect,BrowserRouter,Switch} from 'react-router-dom'
import App from './App';
import Dashboard from './pages/Dashboard'
import UserDashboard from './pages/UserDashboard'
import CompanyDashboard from './pages/CompanyDashboard';
import Login from './pages/Login';
import Auth from './security/auth';

import {SERVER_URL} from './config';
import history from './history';
import {defaultErrorHandler} from './handlers/errorHandlers';
import {checkResponseStatus, loginResponseHandler} from './handlers/responseHandlers';
import Company from './pages/Company';
import User from './pages/User';
import ButtonAppBar from './components/ButtonAppBar';
import Role from './pages/Role';
import LayoutTextFields from './pages/LayoutTextField';
import CreateCompany from './pages/CreateCompany';
import CreateEmployee from './pages/CreateEmployee';
import CreateTicket from './pages/CreateTicket';
import Ticket from './pages/Ticket';
import TicketSearch from './pages/TicketSearch'
import Employee from './pages/Employee';
import Contact from './pages/Contact';

import ContactDashboard from './pages/ContactDashboard';
import FreeSolo from './components/SelectText';
import CreateContact from './pages/CreateContact';
import CreateTask from './pages/CreateTask';
import CreateEmail from './pages/crud/CreateEmail';
import Email from './pages/crud/EmailList';
import CreatePhone from './pages/crud/CreatePhone';
import CreateFax from './pages/crud/CreateFax';
import Phone from './pages/crud/PhoneList';
import Fax from './pages/crud/FaxList';




import Task from './pages/Task';
import Admin from './layout/Admin';




class Index extends React.Component {
  constructor() {
    super();
    this.state = {
        username: '',
        password: '',
        from: '',
        loggedIn:false,
        error: null
    }
  }


  reset = () => { //<1>
    this.setState({
      
        username: '',
        password: '',
      from: '',
      error: null
    });
  };
  //end::state[]

     //get Username
     _usernameValue = (e) =>{
      this.setState({
        username: e.target.value
    });

    }
    //end get Username
     //get Password
     _passwordValue = (e) =>{
      this.setState({
        password: e.target.value
    });
    }
    //end get Password

  //tag::login[]
  LoginSubmit = (e) => {
    console.log('login');
    console.log(SERVER_URL+'/api/login');
    console.log(this.state.username);
    console.log(this.state.password);
    e.preventDefault(); 
    fetch(SERVER_URL+'/api/login', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username':this.state.username,'password':this.state.password})
    }).then(checkResponseStatus) //<3>
    .then(response => loginResponseHandler(response, this.customLoginHandler)) //<4>
    .catch(error => defaultErrorHandler(error, this.customErrorHandler));
    };
  //end::login[]


  

  //tag::lifecycle[]
  componentDidMount() {
    console.log('app mounting...');

    (async () => {
      if (await Auth.loggedIn()) {
        this.setState({loggedIn:true })
      } else {
        this.setState({loggedIn:false })
      }
    })();
  }

  // componentDidUpdate() {
  //    if (this.state.from !== 'login' && !Auth.loggedIn()) {
  //     // this.setState({loggedIn: false})
  //    }
  // }
  //end::lifecycle[]

  //tag::inputChangeHandler[]
  // inputChangeHandler = (event) => {
  //   let {userDetails} = this.state;
  //   const target = event.target;

  //   userDetails[target.name] = target.value; //<1>

  //   this.setState({userDetails});
  // };
  //end::inputChangeHandler[]

  //tag::handler[]
  customLoginHandler = () => { 
   console.log("From "+this.state.from);
   history.push(this.state.from);
    window.location.href = window.location.href;
  };

  customErrorHandler = (error) => { //<2>
    this.reset();
    this.setState({error: error.message});
  };
  //end::handler[]


  //tag::logout[]
  logoutHandler = () => {
    Auth.logOut();
    this.reset();
  };
  //end::logout[]

  render() {
    return (
      <BrowserRouter>
       <ButtonAppBar title="Dashboard" loggedIn={this.state.loggedIn} logoutHandler={this.logoutHandler} />
      <div>
      <Switch>
        <PrivateRoute  exact path="/" >
            <App />
        </PrivateRoute>
        <PrivateRoute  exact path="/admin" >
            <Admin />
        </PrivateRoute>
        <LoggedInRedirect  exact path="/login" >
        <Login LoginSubmit={this.LoginSubmit} _usernameValue={this._usernameValue} _passwordValue={this._passwordValue}/>
        </LoggedInRedirect>
        <PrivateRoute  exact path="/dashboard">
        <Dashboard/>
        </PrivateRoute>
        <PrivateRoute  exact  path="/inputform">
          <LayoutTextFields />
        </PrivateRoute>
        <PrivateRoute  exact  path="/companydashboard">
            <CompanyDashboard />
        </PrivateRoute>
        <PrivateRoute  exact  path="/company/create">
          <CreateCompany />
        </PrivateRoute>
        <PrivateRoute  exact  path="/company">
        <Company />  
        </PrivateRoute>
        <PrivateRoute exact path="/contact/list">
       
            <ContactDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/contact/create">
            <CreateContact />
        </PrivateRoute>
        <PrivateRoute exact path="/userdashboard">
            <UserDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/user">
        <User/>
        </PrivateRoute>
        <PrivateRoute exact path="/free">
        <FreeSolo/>
        </PrivateRoute>
        <PrivateRoute exact path="/role">
        <Role/>
        </PrivateRoute>  
        <PrivateRoute  exact  path="/employee/create">
          <CreateEmployee />
        </PrivateRoute>
        <PrivateRoute  exact  path="/ticket/create">
          <CreateTicket />
        </PrivateRoute>
        <PrivateRoute  exact  path="/task/create">
          <CreateTask />
        </PrivateRoute>
        <PrivateRoute  exact  path="/employee">
          <Employee />
        </PrivateRoute>
        <PrivateRoute  exact  path="/ticket">
          <Ticket />
        </PrivateRoute>
        <PrivateRoute  exact  path="/ticket/search">
          <TicketSearch />
        </PrivateRoute>
        <PrivateRoute  exact  path="/task">
          <Task />
        </PrivateRoute>
        <PrivateRoute  exact  path="/contact">
          <Contact />
        </PrivateRoute>
        
        <PrivateRoute exact path="/create/email">
            <CreateEmail />
        </PrivateRoute>
        <PrivateRoute  exact  path="/email">
          <Email />
        </PrivateRoute>
        <PrivateRoute  exact  path="/mobile">
          <Phone />
        </PrivateRoute>
        <PrivateRoute exact path="/create/mobile">
            <CreatePhone />
        </PrivateRoute>
        <PrivateRoute exact path="/create/fax">
            <CreateFax />
        </PrivateRoute>
        <PrivateRoute exact path="/fax">
            <Fax />
        </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

  

function PrivateRoute({ children, ...rest }) {
  console.log("The location is "+window.location);
  return (
    <Route
      {...rest}
      render={({ location }) =>
      Auth.loggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state :{ from: location }
            }}
          />
        )
        
      }
    />
  );
}

function LoggedInRedirect({ children, ...rest }){
  return (
    <Route
      {...rest}
      render={({ location }) =>
      Auth.loggedIn() ? (
        <Redirect
        to={{
          pathname: "/",
          state :{ from: location }
        }}
      />
        ) : (
          children
        )
        
      }
    />
  );

}
  
ReactDOM.render(<Index />, document.getElementById('root'));

// serviceWorker.unregister();