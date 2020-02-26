import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button ,ButtonGroup} from '@material-ui/core';
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
import {SERVER_URL} from '../config';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
});

class CreateContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname:'',
      lastname:'',
      note:'',
      dob:'',
      company:[],
      companyValue: '',
      position:[],
      positionValue: '',
      updatedValue:'Status',
    }
  }

  componentDidMount(){

    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({company: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));



    fetch(SERVER_URL+'/position')
    .then(r => r.json())
    .then(json => this.setState({position: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
  }
  
  
  handleChangefirstname=(event)=>{
    this.setState({firstname:event.target.value});
    
  }
  handleChangedob=(event)=>{
    this.setState({dob:event.target.value});
    console.log(this.state.dob)
  } 
  handleChangelastname=(event)=>{
    this.setState({lastname:event.target.value});

  }

  handleChangecompany=(event)=>{
    this.setState({companyValue:event.target.value});
    console.log(this.state.companyValue)

  }
  handleChangeposition=(event)=>{
    this.setState({positionValue:event.target.value});
    console.log(this.state.positionValue)

  }
  handleChangenote=(event)=>{
    this.setState({note:event.target.value});

  }
  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/contact', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company:this.state.companyValue,
        firstName:this.state.firstname,
        lastName:this.state.lastname,
        position:this.state.positionValue,
        note:this.state.note,
        dob:this.state.dob
    
      })
    }).then(r=> {
      r.json()
      console.log("The Status is "+r.status)
    }).then(json =>{

      console.log("Json status "+json.status)

    

      let updatedValue = this.state.updatedValue;
      updatedValue = "contact " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})

    } )
    };

  render(){
  const {classes} = this .props;

  return (

   
    <div  component="main" className={classes.root}  >
         <div  className={classes.root}  >
      {/* <Paper > */}
          <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button className={classes.content} href="/admin/contact/list">List Contact</Button>
          <Button className={classes.content} href="/admin/contact/create">Create Contact</Button>
        </ButtonGroup>
          {/* </Paper> */}
          </div>
    <Grid container component="main" className={classes.root}>

    <Grid item  sm={12} md={4} component={Paper} >


   <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Contact Profile
   </Typography>

  <form  onSubmit={this.handleSubmit} >

      
   <TextField
     id="outlined-full-width"
     label="First Name"
     style={{ margin: 8 }}
     placeholder="First Name"
     fullWidth
     margin="normal"
     onChange={this.handleChangefirstname}
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
     onChange={this.handleChangelastname}
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
     onChange={this.handleChangenote}
     InputLabelProps={{
       shrink: true,
     }}
     variant="outlined"
   />
     <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Company"
                        value={this.state.companyValue}
                        onChange={this.handleChangecompany}
                        variant="outlined"
                        >
                            {this.state.company.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Position"
                        value={this.state. positionValue}
                        onChange={this.handleChangeposition}
                        variant="outlined"
                        >
                            {this.state.position.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

      <TextField
    id="date"
    label="DOB"
    type="date"
    defaultValue=""
    onChange={this.handleChangedob}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
  

      <Button type="Submit" variant="contained" size="small" color="primary">
          Save
      </Button>

      <div className={classes.root}>
          {this.state.updatedValue}
          {/* <Alert severity="success" color="info">
          {this.state.updatedValue}
          </Alert> */}
      </div>

  
  

</form>

</Grid>
<Grid item  sm={12} md={4}  component={Paper} square>
<Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Contact
</Typography>
<TextField
     id="outlined-full-width"
     label="Mobile"
     style={{ margin: 8 }}
     placeholder="Mobile"
     fullWidth
     margin="normal"
     onChange={this.handleChangelastname}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <PhoneAndroid />
        </InputAdornment>,
    }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Email"
     style={{ margin: 8 }}
     placeholder="E-Mail"
     fullWidth
     margin="normal"
     onChange={this.handleChangelastname}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <Email />
        </InputAdornment>,
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
     onChange={this.handleChangelastname}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <Email />
        </InputAdornment>,
    }}
     variant="outlined"
   />
</Grid>

</Grid>

</div>
);
}}

export default  withStyles(useStyles)(CreateContact);