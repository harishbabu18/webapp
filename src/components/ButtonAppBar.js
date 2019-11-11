import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from "../besspplicon.png";

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

    render(){
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: '#fff',color:'#f00' }}>
            <Toolbar>
                <img src={logo} alt="Bessppl" />
              <Typography variant="h6" className={classes.title}>
                {this.props.title}
              </Typography>
              <Button color="inherit" onClick={(event) => this.props.logoutHandler(event)}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }

  }

  export default  withStyles(useStyles)(ButtonAppBar);