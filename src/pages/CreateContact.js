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

const useStyles = theme => ({
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
    }).then(r=> r.json()).then(json =>{
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
  function renderCompanyRow(company) {
    return (<MenuItem value={company.id}>{company.name}</MenuItem>);
  }
  function renderPositionRow(position) {
    return (<MenuItem value={position.id}>{position.name}</MenuItem>);
  }

  return (


    <Grid container component="main" className={classes.root}>
    <Grid item  sm={12}component={Paper} elevation={6} square>
 <Paper square>
     <ButtonGroup fullWidth aria-label="full width outlined button group">
     <Button href="/admin/contact/list">List contact</Button>
     <Button href="/admin/contact/create">Create contact</Button>
   </ButtonGroup>
     </Paper>
     </Grid>
<Grid item  sm={12} md={6} component={Paper} elevation={6} square>
    
         
   
    <div className={classes.container}>
      
      <form onSubmit={this.handleSubmit} >
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
      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        //ref={inputLabel} 
        id="demo-simple-select-outlined-label">
          Company
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.companyValue}
          onChange={this.handleChangecompany.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.company.map(renderCompanyRow)}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        //ref={inputLabel} 
        id="demo-simple-select-outlined-label">
          Position
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.positionValue}
          onChange={this.handleChangeposition.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.position.map(renderPositionRow)}
        </Select>
      </FormControl>

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
    <Button className={classes.textField} type="Submit">Save</Button>
      </form>
      <div className={classes.root}>
        {this.state.updatedValue}
      
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
}
}
export default  withStyles(useStyles)(CreateContact);