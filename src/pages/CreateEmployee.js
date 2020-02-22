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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width:'100%',
        justify:"center",
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,
        display:'Center',

    },

    },
  },
  title: {
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1,0),
  },



})


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

    <div  component="main" className={classes.root}  >
    <div  className={classes.root}  >
 {/* <Paper > */}
     <ButtonGroup fullWidth aria-label="full width outlined button group">
     <Button className={classes.content} href="/admin/employee/list">List Company</Button>
     <Button className={classes.content} href="/admin/employee/create">Create Company</Button>
   </ButtonGroup>
     {/* </Paper> */}
     </div>
<Grid item  sm={12} md={6} className={classes.content} >


<div>

   <Card className={classes.root} variant="outlined">
       <CardContent >
           <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
               Create Employee Profile
           </Typography>

           <form  onSubmit={this.handleSubmit} >
               <Grid item >

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
<CardActions>

<Button type="Submit" variant="contained" size="small" color="primary">
    Save
</Button>

<div className={classes.root}>
    {this.state.updatedValue}
    {/* <Alert severity="success" color="info">
    {this.state.updatedValue}
    </Alert> */}
</div>

</CardActions>
</Grid>

</form>

</CardContent>
</Card>

</div>

</Grid>
<Grid item  sm={12} md={6} square>
<Grid item  sm={12} component={Paper} square>



</Grid>
<Grid item  sm={12} component={Paper} square>

</Grid>
</Grid>
</div>
);
}}


export default  withStyles(useStyles)(CreateEmployee);