import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Select from '@material-ui/core/Select';
import {SERVER_URL} from '../../config';

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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

});

class CreateFax extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          company:[],
          companyValue: '',
          contact:[],
          contactValue:'',
          faxValue:'',
      }
    }

    componentDidMount() {
    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({company: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/contact')
    .then(r => r.json())
    .then(json => this.setState({contact: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
    }

  handleChangeCompanyValue=(event)=>{
    this.setState({companyValue:event.target.value});
    
  }

  handlecontactValue=(event)=>{
    this.setState({contactValue:event.target.value});

  }
  handlefaxValue=(event)=>{
    this.setState({faxValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/fax', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:this.state.faxValue,
        company:this.state.companyValue,
        contact:this.state.contactValue
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Fax ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})
    } )
    };



  render() {
    const { classes } = this.props;
    function renderCompanyRow(company) {
        return (<MenuItem value={company.id}>{company.name}</MenuItem>);
      }

      function renderContactRow(contact) {
        return (<MenuItem value={contact.id}>{contact.firstName}</MenuItem>);
      }

      return(
          <div>
               <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Fax
              </Typography>

      

              <TextField
     id="outlined-full-width"
     label="Fax-No"
     style={{ margin: 8 }}
     placeholder="Fax"
     fullWidth
     margin="normal"
     onChange={this.handlefaxValue}
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
          
        </IconButton>
      </InputAdornment>
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
  onChange={this.handleChangeCompanyValue.bind(this)}
 // labelWidth={labelWidth}
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
  Contact
</InputLabel>
<Select
  labelId="demo-simple-select-outlined-label"
  id="demo-simple-select-outlined"
  value={this.state.contactValue}
  onChange={this.handlecontactValue.bind(this)}
  //labelWidth={labelWidth}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {this.state.contact.map(renderContactRow)}
</Select>
</FormControl>
<Button className={classes.textField} type="Submit">Save</Button>
</form>

<div className={classes.root}>
{this.state.updatedValue}
{/* <Alert severity="success" color="info">
{this.state.updatedValue}
</Alert> */}
</div>
</div>
</div>
      )



}
      }

export default  withStyles(useStyles)(CreateFax);