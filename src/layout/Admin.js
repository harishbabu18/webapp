import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactsIcon from '@material-ui/icons/Contacts';
import EventIcon from '@material-ui/icons/Event';

import CachedIcon from '@material-ui/icons/Cached';
import StorageIcon from '@material-ui/icons/Storage';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import Ticket from '../pages/Ticket';
import ButtonAppBar from './../components/ButtonAppBar'
import Calendar from './../components/DropDownSide'
import Address from './../components/AddressDropdown'
import Storage from './../components/StorageDropdown'
import Opportunities from './../components/OpportunitiesDropdown'

import { Route } from 'react-router-dom';  
import Company from './../pages/Company';
import { Link } from "react-router-dom";




                          //  ADMIN

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color:'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));








export default function MiniDrawer({component: Component, ...rest}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
            <ListItem button >
              <ListItemIcon> <DashboardIcon /> </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

           
            <Calendar />

            
            <Address />
            
            
            <Storage />
            
            <ListItem button component={Link} to="/admin/ticket/list">
              <ListItemIcon> <ConfirmationNumberIcon /> </ListItemIcon>
              <ListItemText primary="Ticket" />
            </ListItem>
            
          
            <Opportunities />
            
            <ListItem button >
              <ListItemIcon> <BorderColorIcon /> </ListItemIcon>
              <ListItemText primary="Contracts" />
            </ListItem>
            
            <ListItem button >
              <ListItemIcon> <AddShoppingCartIcon /> </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          
            <ListItem button >
              <ListItemIcon> <AccountBalanceIcon /> </ListItemIcon>
              <ListItemText primary="Accounting" />
            </ListItem>

            <ListItem button >
              <ListItemIcon> <TimerIcon /> </ListItemIcon>
              <ListItemText primary="Time Keeping" />
            </ListItem>
          


            <ListItem button >
              <ListItemIcon> <SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            

        </List>
      </Drawer>

      <Route {...rest} render={matchProps => (  
      <div>
          <Component {...matchProps} />  
      </div>
     
    )} /> 

      
      

   
    </div>
  );
}
