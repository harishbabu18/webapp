import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import {SERVER_URL} from '../config';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Email from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = theme => ({
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
});


class CreateEmployee extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      emailValue: '',
      dobValue:'',
      profilepicValue: '',
      joinindateValue: '',
      employee:'',
      firstNameValue:'',
      lastNameValue:'',
      relievingdateValue:'',
      updatedValue:''
    }
  }
  componentDidMount() {

    fetch(SERVER_URL+'/employee')
    .then(r => r.json())
    .then(json => this.setState({employee: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
    }

  handleEmailValue=(event)=>{
    this.setState({emailValue:event.target.value});
  }

  handleFirstnameValue=(event)=>{
    this.setState({firstNameValue:event.target.value});

  }

  handleLastNameValue=(event)=>{
    this.setState({lastNameValue:event.target.value});

  }

  handleJoiningDateValue=(event)=>{
    this.setState({joinindateValue:event.target.value});
    
  }

  handleRelievingDateValue=(event)=>{
    this.setState({relievingdateValue:event.target.value});

  }

  handleDobValue=(event)=>{
    this.setState({dobValue:event.target.value});

  }

  handleProfilepicValue=(event)=>{
    this.setState({profilepicValue:'profilpic.jpg'});

  }

  


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/employee', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName:this.state.firstNameValue,
        relievingdate:this.state.relievingdateValue,
        joinindate:this.state.joinindateValue,
        lastName:this.state.lastNameValue,
        profilepic:this.state.profilepicValue,
        dob:this.state.dobValue,
        email:this.state.emailValue,
      })
    }).then(r=> r.json()).then(json=>{let updatedValue = this.state.updatedValue;
      updatedValue = "Employee ID "+json.id+" is Added Successfully";
      this.setState({updatedValue})
    })
    }

  render() {
    const { classes } = this.props;


  return (

    <Grid container component="main" className={classes.root}>
    <Grid item  sm={12}component={Paper} elevation={6} square>
 <Paper square>
     <ButtonGroup fullWidth aria-label="full width outlined button group">
     <Button href="/admin/employee/list">List employee</Button>
     <Button href="/admin/employee/create">Create employee</Button>
   </ButtonGroup>
     </Paper>
     </Grid>
<Grid item  sm={12} md={6} component={Paper} elevation={6} square>
    <div>
        <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Employee Profile
              </Typography>

      <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="First Name"
          style={{ margin: 8 }}
          placeholder="First Name "
          fullWidth
          margin="normal"
          onChange={this.handleFirstnameValue}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

<TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Last Name"
          style={{ margin: 8 }}
          placeholder="Last Name "
          fullWidth
          margin="normal"
          onChange={this.handleLastNameValue}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

<TextField
     id="outlined-full-width"
     label="E-Mail"
     style={{ margin: 8 }}
     placeholder="E-Mail"
     fullWidth
     margin="normal"
     className={classes.textField}
     onChange={this.handleEmailValue}
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
          
        </IconButton>
      </InputAdornment>
    }}
     variant="outlined"
   />
    
    <form className={classes.container} noValidate>
  <TextField
    id="date"
    label="Date Of Birth"
    type="date"
    defaultValue=""
    onChange={this.handleDobValue}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>

<form className={classes.container} noValidate>
  <TextField
    id="date"
    label="Joining Date"
    type="date"
    defaultValue=""
    onChange={this.handleJoiningDateValue}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>

<input
  accept="image/*"
  className={classes.input}
  onChange={this.handleProfilepicValue}
  style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
/>
<label htmlFor="raised-button-file">
  <Button variant="raised" component="span" className={classes.textField}>
    Profile Pic
  </Button>
</label> 


    <form className={classes.container} noValidate>
  <TextField
    id="date"
    label="Relieving Date"
    type="date"
    defaultValue=""
    onChange={this.handleRelievingDateValue}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>

        <Button className={classes.textField} type="Submit">Save</Button>
        <div className={classes.root}>
        {this.state.updatedValue}
        </div>

        </form>
        </div>

    
   
      
    </div>


    </Grid>
<Grid item  sm={12} md={6} square>
<Grid item  sm={12} component={Paper} square>



 </Grid>
 <Grid item  sm={12} component={Paper} square>
  
 </Grid>
</Grid>
</Grid>
  );
}}

export default  withStyles(useStyles)(CreateEmployee);