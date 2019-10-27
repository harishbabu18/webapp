import React from 'react';
import StatusBox from '../components/StatusBox';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function Dashboard() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
            <Grid container spacing={3}>

      <StatusBox name="harish" count="4"/>
      <StatusBox  name="Akshitha" count="1"/>
      <StatusBox  name="Sharmila" count="1"/>
      <StatusBox  name="Na pa Pon" count="1"/>
      <StatusBox  name="Chrissy" count="1"/>
      <StatusBox  name="Chrissy" count="1"/>
      <StatusBox  name="Chrissy" count="1"/>
      <StatusBox  name="Chrissy" count="1"/>
      </Grid>
    </div>
  );
}

export default Dashboard;