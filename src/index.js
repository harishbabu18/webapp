import React from 'react';
import ReactDOM from 'react-dom';
import { Route,Redirect,BrowserRouter , Switch} from 'react-router-dom'
import App from './App';
import Dashboard from './pages/Dashboard'
import UserDashboard from './pages/UserDashboard'
import CompanyDashboard from './pages/CompanyDashboard';
import Login from './pages/Login';



class Index extends React.Component {
  constructor(prop) {
    super();
  }

  render() {
    return (
      <BrowserRouter>
      <div>
      <Switch>
        <Route  exact path="/" >
            <App />
        </Route>
        <Route  exact path="/login" >
            <Login />
        </Route>
        <PrivateRoute path="/dashboard">
            <Dashboard />
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

  

  function PrivateRoute({ component: Component }){
    return(
      <Redirect to={{ pathname: "/login"  }} />
    );

  }
  
ReactDOM.render(<Index />, document.getElementById('root'));

// serviceWorker.unregister();