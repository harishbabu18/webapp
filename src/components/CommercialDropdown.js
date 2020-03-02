import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Link } from "react-router-dom";
import LoopIcon from '@material-ui/icons/Loop';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Commercial (props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };
  
    return (
        <div>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <TransferWithinAStationIcon /> 
          </ListItemIcon>
          <ListItemText primary="Commercial" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to="/commercial/offer/list">
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Offers" />
            </ListItem>


            <ListItem button className={classes.nested}  component={Link} to="/commercial/opportunity/list">
              <ListItemIcon>
                <LoopIcon />
              </ListItemIcon>
              <ListItemText primary="Opportunity" />
            </ListItem>



            <ListItem button className={classes.nested}  component={Link} to="/commercial/contract/list">

              <ListItemIcon>
                <FileCopyIcon  />
              </ListItemIcon>
              <ListItemText primary="Contract" />
            </ListItem>
          </List>
        </Collapse>
        </div>
    );
  }