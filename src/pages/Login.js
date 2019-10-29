import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import logo from "../besspplicon.png"
import {SERVER_URL} from '../config';
import {defaultErrorHandler} from '../handlers/errorHandlers';
import {checkResponseStatus, loginResponseHandler} from '../handlers/responseHandlers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://bessppl.com/">
        Bessppl
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?software,job)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});






class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        username: '',
        password: ''
      },
      error:null
      
        
    }
  }
   
    //tag::login[]
    LoginSubmit = (e) => {
      console.log('login');
      e.preventDefault(); 
  
      fetch(`${SERVER_URL}/api/login`, { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.userDetails)
      }).then(checkResponseStatus) 
        .then(response => loginResponseHandler(response, this.customLoginHandler)) 
        .catch(error => defaultErrorHandler(error, this.customErrorHandler)); 
    };
    //end::login[]

      //tag::inputChangeHandler[]
  inputChangeHandler = (event) => {
    let {userDetails} = this.state;
    const target = event.target;

    userDetails[target.name] = target.value; //<1>

    this.setState({userDetails});
  };
  //end::inputChangeHandler[]

  


  render() {

    const { classes } = this.props;


    return (
      <div>
     <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
                <img src={logo} alt="Bessppl"/>
              <Typography component="h1" variant="h5">
                Login {this.state.error}
              </Typography>
              <form className={classes.form}  onSubmit={(event) => this.LoginSubmit(event)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="username"
                  autoFocus
                  //value={this.userDetails.username}
                  onChange={this.inputChangeHandler}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  //value={this.userDetails.username}
                  onChange={this.inputChangeHandler}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
     </div>
    );
  }

}

export default  withStyles(useStyles)(Login);
