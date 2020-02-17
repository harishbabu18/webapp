import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom'
import logo from "../qualifica.png";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import CreateCompany from '../pages/CreateCompany';
import CreateContact from '../pages/CreateContact'





const useStyles = theme => ({
  grow: {
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
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },

  appBar: {
    position: 'relative',
    color: 'white',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


 
  class ButtonAppBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open:true,
        anchorEl:null,
        anchorEl1:null,
        dropdown:false,
        dropdown1:false,
        clickOpen:false,
        clickClose:true,
        open2:false,
        createpages:'',
        id:''

      }
    }


     toggleDrawer  = (open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({sideMenu:open})
      console.log("Current State o "+this.state.sideMenu)
  
    };

    handleMenu = event => {
      // setAnchorEl(event.currentTarget);

      this.setState({anchorEl:event.currentTarget,dropdown:true})


      console.log("Current status Target"+event.currentTarget);


    };

    handleMenu1 = event => {
      // setAnchorEl(event.currentTarget);

      this.setState({anchorEl1:event.currentTarget,dropdown1:true})


      console.log("Current status Target"+event.currentTarget);


    };


    handleClose = () => {
      this.setState({anchorEl:null,dropdown:false})
    };

    handleClose1 = () => {
      this.setState({anchorEl1:null,dropdown1:false})
      console.log('close1')
    };

     handleClickOpen = (event) => {
      this.setState({clickOpen:true,id:event.target.id})

      if(event.target.id==='company'){
        
      }
      console.log('this '+this.state.clickOpen)
      console.log("page id"+event.target.id)
    };
  
     handleclickClose = () => {
      this.setState({clickOpen:false,id:''})
      console.log('this '+this.state.clickOpen)

    };

 
   


    renderElement(){
      const { classes } = this.props;

      // const Transition = React.forwardRef(function Transition(props, ref) {
      //   return <Slide direction="up" ref={ref} {...props} />;
      // });
     

      if(this.props.loggedIn == true){
         return (<div>
           {/* <Link to="/company" className={classes.Link} > <Button color="inherit" > Company </Button> </Link>
           <Link to="/contact" className={classes.Link} > <Button color="inherit" > Contact </Button> </Link>
           <Link to="/ticket" className={classes.Link} > <Button color="inherit" > Ticket </Button> </Link>
           <Link to="/task" className={classes.Link} > <Button color="inherit" > Task </Button> </Link>
           <Link to="/employee" className={classes.Link} > <Button color="inherit" > Employee </Button> </Link> */}
           <IconButton 
           aria-label="show 17 new notifications"
           onClick={this.handleMenu1}
           color="inherit">
            
           <AddIcon />
           </IconButton>


           <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl1}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.dropdown1}
                onClose={this.handleClose1}

              >
                <MenuItem id='company' onClick={this.handleClickOpen} > Company </MenuItem>
                <MenuItem id='contact' onClick={this.handleClickOpen} > Contact </MenuItem>
                <MenuItem  onClick={this.handleClickOpen} > Task </MenuItem>
                <MenuItem onClick={this.handleClickOpen} > Ticket </MenuItem>
                <MenuItem onClick={this.handleClickOpen} > Employee </MenuItem>
                <MenuItem onClick={this.handleClickOpen} > Email </MenuItem>
                <MenuItem onClick={this.handleClickOpen} > Phone </MenuItem>
                <MenuItem onClick={this.handleClickOpen} > Fax </MenuItem>

              </Menu>

           <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
           <IconButton
              edge="end"
              aria-label="account of current user"
              //aria-controls={menuId}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.dropdown}
                onClose={this.handleClose}

              >
                <MenuItem>My Profile</MenuItem>
                <MenuItem onClick={(event) => this.props.logoutHandler(event)}>Logout</MenuItem>
              </Menu>
          {/* <Button color="inherit" >Logout</Button> */}

       
          </div>)
         }
   }

   renderCreatePage=(event)=>{

    console.log(event.target.id)

   }


    render(){
      const { classes } = this.props;

  


   


      // const Transition = React.forwardRef(function Transition(props, ref) {
      //   return <Slide direction="up" ref={ref} {...props} />;
      // });

      return (
        <div className={classes.grow}>
          <AppBar position="static" style={{ backgroundColor: '#fff',color:'#f00' }}>
            <Toolbar>
            <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
                <img src={logo} alt="Qualifica Group" />
              <Typography variant="h6" className={classes.title}>
                {this.props.title}
              </Typography>
              {this.renderElement()}
            </Toolbar>
          </AppBar>
       <Drawer open={this.state.sideMenu} onClose={this.toggleDrawer(false)}>
       <div
      className={classes.list}
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}>
         <List>
        <ListItem button key="dashboard">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
      </List>

      </div>
       </Drawer>

       <Dialog fullScreen open={this.state.clickOpen} onClose={this.handleclickClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
       <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleclickClose} aria-label="close">
              <CloseIcon />
            </IconButton>
         
          </Toolbar>
        </AppBar>

        <div>
        {(() => {
        switch (this.state.id) {
          case "company":   return <CreateCompany />;
          case "contact": return "#00FF00";
          default:      return "#FFFFFF";
        }
      })()}
        
      

        </div>
     
     
      </Dialog>
       
        </div>
      );
    }

  }

  export default  withStyles(useStyles)(ButtonAppBar);