import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from "../besspplicon.png";
//import Auth from '../security/auth';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

 
  class ButtonAppBar extends React.Component {
    constructor(props) {
      super(props);
    }

  //tag::logout[]
  //  logoutHandler = async() => {
  //   Auth.logOut();
  //   console.log("Logout");
  //   props.history.push("/login");
  // };
  //end::logout[]

    render(){
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <img src={logo} alt="Bessppl" />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Dashboard
              </Typography>
              <Button color="inherit" onClick={(event) => this.props.logoutHandler(event)}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }

  }

  export default  withStyles(useStyles)(ButtonAppBar);