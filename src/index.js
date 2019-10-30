import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Redirect,BrowserRouter , Switch} from 'react-router-dom'
import App from './App';
import Dashboard from './pages/Dashboard'
import UserDashboard from './pages/UserDashboard'
import CompanyDashboard from './pages/CompanyDashboard';
import Login from './pages/Login';
import Auth from './security/auth';

import {SERVER_URL} from './config';
import {defaultErrorHandler} from './handlers/errorHandlers';
import {checkResponseStatus, loginResponseHandler} from './handlers/responseHandlers';




class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      userDetails: {
        username: '',
        password: ''
      },
      route: '',
      error: null
    }
  }


  reset = () => { //<1>
    this.setState({
      userDetails: {
        username: '',
        password: ''
      },
      route: 'login',
      error: null
    });
  };
  //end::state[]

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
        this.setState({route: 'garage'})
      } else {
        this.setState({route: 'login'});
      }
    })();
  }

  componentDidUpdate() {
    if (this.state.route !== 'login' && !Auth.loggedIn()) {
      this.setState({route: 'login'})
    }
  }
  //end::lifecycle[]

  //tag::inputChangeHandler[]
  inputChangeHandler = (event) => {
    let {userDetails} = this.state;
    const target = event.target;

    userDetails[target.name] = target.value; //<1>

    this.setState({userDetails});
  };
  //end::inputChangeHandler[]

  //tag::login[]
  login = (e) => {
    console.log('login');
    e.preventDefault(); //<1>

    fetch(`${SERVER_URL}/api/login`, { //<2>
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.userDetails)
    }).then(checkResponseStatus) //<3>
      .then(response => loginResponseHandler(response, this.customLoginHandler)) //<4>
      .catch(error => defaultErrorHandler(error, this.customErrorHandler)); //<5>
  };
  //end::login[]

  //tag::handler[]
  customLoginHandler = () => { //<1>
    this.setState({route: 'garage'});
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
            <App />
        </Route>
        <Route  exact path="/login" >
            <Login LoginSubmit={this.LoginSubmit}/>
        </Route>
        <PrivateRoute path="/dashboard">
            <Dashboard logoutHandler={this.logoutHandler}/>
        </PrivateRoute>
        <PrivateRoute path="/companydashboard">
            <CompanyDashboard />
        </PrivateRoute>
        <PrivateRoute path="/userdashboard">
            <UserDashboard />
        </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

  

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
       localStorage.auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
  
ReactDOM.render(<Index />, document.getElementById('root'));

// serviceWorker.unregister();