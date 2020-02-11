import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SelectText from '../components/SelectText'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Email from '@material-ui/icons/Email';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import NoteIcon from '@material-ui/icons/Note';
import CountrySelect from '../components/CountrySelect'
import Task from './Task'
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

class CreateContact {
  render(){
  const {classes} = this .props;

  return (
      <div>    
    <Grid container component="main" className={classes.root}>
    <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
    <div className={classes.container}>
     
    <Typography component="h1" variant="h5" inline>
                Create Contact Profile
              </Typography>
      
   <TextField
     id="outlined-full-width"
     label="First Name"
     style={{ margin: 8 }}
     placeholder="First Name"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <AccountCircle />
        </InputAdornment>,
    }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Last Name"
     style={{ margin: 8 }}
     placeholder="Last Name"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <AccountCircle />
        </InputAdornment>,
    }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Note"
     style={{ margin: 8 }}
     placeholder="Note"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
   <SelectText />
   <SelectText />
   <Button variant="contained" size="small"  color="primary">
        <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
    </div>
    </Grid>
    <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
    <div className={classes.container}>
    <Typography component="h1" variant="h5" inline>
                Create Contact
              </Typography>
    <TextField
     id="outlined-full-width"
     label="E-Mail"
     style={{ margin: 8 }}
     placeholder="E-Mail"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <Email />
        </InputAdornment>,
        endAdornment:<InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          >
            <AddBox />
          
        </IconButton>
      </InputAdornment>
    }}
     variant="outlined"
   />
    
    

   <TextField
     id="outlined-full-width"
     label="Mobile"
     style={{ margin: 8 }}
     placeholder="Mobile"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <PhoneAndroid />
        </InputAdornment>,
        endAdornment:<InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          >
            <AddBox />
          
        </IconButton>
      </InputAdornment>
    }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Fax"
     style={{ margin: 8 }}
     placeholder="Fax"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <AccountCircle />
        </InputAdornment>,
        endAdornment:<InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          >
            <AddBox /> 
        </IconButton>
      </InputAdornment>
    }}
     variant="outlined"
   />
   </div>
   
    </Grid>
    <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
    <div className={classes.container}>

    <Typography component="h1" variant="h5" inline>
                Contact List
              </Typography>
              </div>
    </Grid>
    <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
    <div className={classes.container}>
    <Typography component="h1" variant="h5" inline>
                Create Address
              </Typography>
              <TextField
     id="outlined-full-width"
     label="Address Line One"
     style={{ margin: 8 }}
     placeholder="Address Line One"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Address Line two"
     style={{ margin: 8 }}
     placeholder="Address Line two"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Area"
     style={{ margin: 8 }}
     placeholder="Area"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Zip"
     style={{ margin: 8 }}
     placeholder="Zip"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
   <CountrySelect />
   <Button variant="contained" size="small"  color="primary">
        <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
   </div>
    </Grid>
    <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
    <div className={classes.container}>
    <Typography component="h1" variant="h5" inline>
                Address List
              </Typography>
   </div>
    </Grid>
    <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
    <div className={classes.container}>
    <Typography component="h1" variant="h5" inline>
                Create Task
              </Typography>
    <TextField
     id="outlined-full-width"
     label="Task"
     style={{ margin: 8 }}
     placeholder="Task"
     fullWidth
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
   <SelectText />
</div>
              
   
    </Grid>
    <Grid item  sm={12} component={Paper} elevation={6} square>
      <Task />

    </Grid>

    
    </Grid>
    </div>
  );
}
}
export default  withStyles(useStyles)(CreateContact);