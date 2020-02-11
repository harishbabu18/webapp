import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

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
  Link : {
    textDecoration: 'none',
    color:'inherit',
  }


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
              <Link to="/task/create" className={classes.Link} > <Button color="inherit" > Task </Button> </Link>
              <Link to="/ticket/create" className={classes.Link} > <Button color="inherit" > Ticket </Button> </Link>
              <Link to="/company/create" className={classes.Link} > <Button color="inherit" > Company </Button> </Link>
              <Link to="/contact/create" className={classes.Link} > <Button color="inherit" > Contact </Button> </Link>
              <Link to="/employee/create" className={classes.Link} > <Button color="inherit" > Employee </Button> </Link>
              <Button color="inherit" onClick={(event) => this.props.logoutHandler(event)}>Logout</Button>
            
              <Link to="/login" className={classes.Link} > <Button color="inherit" >Login</Button> </Link>
            </Toolbar>
          </AppBar>
        </div>
      );
    }

  }

  export default  withStyles(useStyles)(ButtonAppBar);