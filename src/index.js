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
import Role from './pages/Role';
import LayoutTextFields from './pages/LayoutTextField';
import CreateCompany from './pages/CreateCompany';
import CompanyDetail from './pages/CompanyDetail';
import CreateEmployee from './pages/CreateEmployee';
import CreateTicket from './pages/CreateTicket';
import Ticket from './pages/Ticket';
import TicketSearch from './pages/TicketSearch'
import Employee from './pages/Employee';
import Contact from './pages/Contact';
import Calender from './pages/Calendar';
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
import CreateTransport from './pages/crud/CreateTransport';
import Transport from './pages/crud/TransportList';
import Calendar from './pages/Calendar';
import Task from './pages/Task';
import Admin from './layout/Admin';
import allReducers from './reducers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import CreateProduct from './pages/crud/CreateProduct';
import Product from './pages/Product';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#f7ad00',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});


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


  reset = () => {
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
        <Admin logoutHandler={this.logoutHandler}  exact path="/" >
            <App />
        </Admin>
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

        <PrivateRoute  exact  path="/company">
        <Company />  
        </PrivateRoute>
        <PrivateRoute exact path="/contact/list">
       
            <ContactDashboard />
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
        <PrivateRoute  exact  path="/ticket/create">
          <CreateTicket />
        </PrivateRoute>
        <PrivateRoute  exact  path="/task/create">
          <CreateTask />
        </PrivateRoute>
        <PrivateRoute  exact  path="/employee">
          <Employee />
        </PrivateRoute>
        {/* <PrivateRoute  exact  path="/ticket">
          <Ticket />
        </PrivateRoute> */}
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
        <PrivateRoute exact path="/transport">
            <Transport />
        </PrivateRoute>
        <PrivateRoute exact path="/create/transport">
            <CreateTransport />
        </PrivateRoute>
        <PrivateRoute exact path="/calendar">
            <Calender />
        </PrivateRoute>
        
          <Admin path="/admin/product/create">
            <CreateProduct />
          </Admin>
          <Admin path="/admin/product/list">
            <Product />
        </Admin>

        <Admin path="/admin/ticket/list">
          <Ticket />
        </Admin>
        <Admin path="/admin/ticket/create">
          <CreateTicket />
        </Admin>

        <Admin path="/addressbook/company/list">
        <Company />
        </Admin>

        <Admin logoutHandler={this.logoutHandler} path="/addressbook/company/create">
        <CreateCompany />
        </Admin>
        <Admin  logoutHandler={this.logoutHandler}  path="/addressbook/contact/list">
          <Contact />
        </Admin>
        <Admin logoutHandler={this.logoutHandler}  path="/addressbook/contact/create">
          <CreateContact />
        </Admin>
        <Admin logoutHandler={this.logoutHandler}  path="/addressbook/employee/list">
          <Employee />
        </Admin>
        <Admin logoutHandler={this.logoutHandler} path="/addressbook/employee/create">
          <CreateEmployee />
        </Admin>

        <Admin path="/admin/calendar/activities">
          <Calendar />
        </Admin>
        
        <Admin path="/admin/companydetail">
          <CompanyDetail />
        </Admin>

        </Switch>
       
      </div>
    </BrowserRouter>
    );
  }
}

  

function PrivateRoute({logoutHandler, children, ...rest }) {
  console.log("The location is "+window.location);
  return (
    <Route
    logoutHandler={logoutHandler}
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

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <Provider store={store}>
<Index />
</Provider>
</MuiThemeProvider>
, document.getElementById('root'));

// serviceWorker.unregister();