import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Contact from './Contact';
import CreateContact from './CreateContact';


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

class ContactDashboard extends React.Component {
  constructor() {
      super();
  
      this.state = {
        companies: []
      }
    }
    render() {
      const { classes } = this.props;

  return (
    <div>
      <Grid container component="main" className={classes.root}>
      <Grid item  sm={12} component={Paper} elevation={6} square>
      <Contact />
      </Grid> 
      </Grid>
    </div>
  );
}
}

export default   withStyles(useStyles)(ContactDashboard);