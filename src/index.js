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
import Employee from './pages/Employee';


import ContactDashboard from './pages/ContactDashboard';
import FreeSolo from './components/SelectText';
import CreateContact from './pages/CreateContact';
// import TicketCreate from './pages/TicketCreate';
//import Role from './pages/Role';




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
      <div>
      <Switch>
        <Route  exact path="/" >
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
            <App />
        </Route>

        {/* <Route  exact path="/login" >
            <Login LoginSubmit={this.LoginSubmit} _usernameValue={this._usernameValue} _passwordValue={this._passwordValue}/>
        </Route> */}

        <LoggedInRedirect  exact path="/login" >
        <Login LoginSubmit={this.LoginSubmit} _usernameValue={this._usernameValue} _passwordValue={this._passwordValue}/>
        </LoggedInRedirect>
        <PrivateRoute  exact path="/dashboard">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
        <Dashboard/>
        </PrivateRoute>
        <PrivateRoute  exact  path="/inputform">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
          <LayoutTextFields />
        </PrivateRoute>
        <PrivateRoute  exact  path="/companydashboard">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
            <CompanyDashboard />
        </PrivateRoute>
        {/* <PrivateRoute  exact  path="/ticket/create">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
            <TicketCreate />
        </PrivateRoute> */}
        <PrivateRoute  exact  path="/company/create">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
          <CreateCompany />
        </PrivateRoute>
        <PrivateRoute  exact  path="/company/list">
        <ButtonAppBar title="Company" logoutHandler={this.logoutHandler} />
        <Company />  
        </PrivateRoute>
        <PrivateRoute exact path="/contact/list">
        <ButtonAppBar title="User Dashboard" logoutHandler={this.logoutHandler} />
            <ContactDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/contact/create">
        <ButtonAppBar title="Contact Create" logoutHandler={this.logoutHandler} />
            <CreateContact />
        </PrivateRoute>
        <PrivateRoute exact path="/userdashboard">
        <ButtonAppBar title="User Dashboard" logoutHandler={this.logoutHandler} />
            <UserDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/user">
        <ButtonAppBar title="User" logoutHandler={this.logoutHandler} />
        <User/>
        </PrivateRoute>
        <PrivateRoute exact path="/free">
        <ButtonAppBar title="User" logoutHandler={this.logoutHandler} />
        <FreeSolo/>
        </PrivateRoute>
        
        <PrivateRoute exact path="/role">
        <ButtonAppBar title="User" logoutHandler={this.logoutHandler} />
        <Role/>
        </PrivateRoute>  
        <PrivateRoute  exact  path="/employee/create">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
          <CreateEmployee />
        </PrivateRoute>
        <PrivateRoute  exact  path="/ticket/create">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
          <CreateTicket />
        </PrivateRoute>
        <PrivateRoute  exact  path="/employee">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
          <Employee />
        </PrivateRoute>
        <PrivateRoute  exact  path="/ticket">
        <ButtonAppBar title="Dashboard" logoutHandler={this.logoutHandler} />
          <Ticket />
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