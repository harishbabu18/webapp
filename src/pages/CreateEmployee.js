import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Email from '@material-ui/icons/Email';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Web from '@material-ui/icons/Web';
import CountrySelect from '../components/CountrySelect'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 200,
  },

}));

export default function CreateEmployee() {
  const classes = useStyles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
      <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
        <div  className={classes.container}>
        <Typography component="h1" variant="h5" inline>
                Create Employee Profile
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
          variant="outlined"
        />

            <input
                accept="image/*"
                className={classes.textField}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
            />
            <label htmlFor="raised-button-file"  >
            <Button variant="raised" component="span" className={classes.textField} >
                Upload Profile Pic
            </Button>
            </label> 

        <TextField
                          // onChange={this.handleChange}
                          id="outlined-multiline-flexible"
                          label="Date Of Birth"
                          type="date"
                          defaultValue="2017-05-24"
                          variant="outlined"
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                        />

         <TextField
                          // onChange={this.handleChange}
                          id="outlined-multiline-flexible"
                          label="Joining Date"
                          type="date"
                          defaultValue="2017-05-24"
                          variant="outlined"
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                        />

        <TextField
                          // onChange={this.handleChange}
                          id="outlined-multiline-flexible"
                          label="Relieving Date"
                          type="date"
                          defaultValue="2017-05-24"
                          variant="outlined"
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                        />

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

        <Button>Save</Button>
        </div>

      </Grid>
    
   
      </Grid>
      
    </div>
  );
}