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
import CountrySelect from '../components/CountrySelect';
import InputLabel from '@material-ui/core/InputLabel';

import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    width: 240,
  },
}));

export default function CreateTicket() {
  const classes = useStyles();

  const [age, setAge] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
      <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
        <div  className={classes.container}>
        <Typography component="h1" variant="h5" inline>
                Create Ticket Profile
              </Typography>

      <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Description"
          style={{ margin: 8 }}
          placeholder="Description "
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

<FormControl variant="outlined" className={classes.textField}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Ticket Source
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

     

      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Company
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>


<FormControl variant="outlined" className={classes.textField}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Ticket Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

       <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Employee"
          style={{ margin: 8 }}
          placeholder="Employee "
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
            id="outlined-full-width"
            className={classes.textField}
            label="Contact"
            style={{ margin: 8 }}
            placeholder="Contact"
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
                          // onChange={this.handleChange}
                          id="outlined-multiline-flexible"
                          className={classes.textField}
                          label="Date Created"
                          type="date"
                          defaultValue="2017-05-24"
                          variant="outlined"
                          className={classes.textField}
                          InputLabelProps={{
                          shrink: true,
                          }}
                        />

        

        <Button>Save</Button>
        </div>

      </Grid>
    
   
      </Grid>
      
    </div>
  );
}