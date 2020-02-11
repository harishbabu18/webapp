import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import {SERVER_URL} from '../config';

// import { useState, useEffect } from "react";
// import axios from 'axios';


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


class CreateTicket extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      // description:[],
      descriptionValue:'',
      ticketStatusType: [],
      ticketStatusTypeValue: '',
      ticketSource:[],
      ticketSourceValue: '',
      company:[],
      companyValue: '',
      employee:[],
      employeeValue:'',
      contact:[],
      contactValue:'',
      updatedValue:[],
    }
  }
  componentDidMount() {
    fetch(SERVER_URL+'/ticketStatusType')
    .then(r => r.json())
    .then(json => this.setState({ticketStatusType: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/ticketSource')
    .then(r => r.json())
    .then(json => this.setState({ticketSource: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({company: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/employee')
    .then(r => r.json())
    .then(json => this.setState({employee: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
   
    fetch(SERVER_URL+'/contact')
    .then(r => r.json())
    .then(json => this.setState({contact: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
  }

  handleChange=(event)=>{
    this.setState({descriptionValue:event.target.value});
  }

  handleChangeticketStatusTypeValue(event){
    this.setState({ticketStatusTypeValue:event.target.value});

  }

  handleChangeticketSourceValue(event){
    this.setState({ticketSourceValue:event.target.value});

  }

  handleChangeCompanyValue(event){
    this.setState({companyValue:event.target.value});
    
  }

  handleemployeeeValue(event){
    this.setState({employeeValue:event.target.value});

  }

  handlecontactValue(event){
    this.setState({contactValue:event.target.value});

  }

  handleSubmit=(event)=>{
    event.preventDefault()
    this.setState({updatedValue:{
      contact:this.state.contactValue,
      employee:this.state.employeeValue,
      company:this.state.companyValue,
      ticketSource:this.state.ticketSourceValue,
      ticketStatusType:this.state.ticketStatusTypeValue,
      description:this.state.descriptionValue,
    }
    
    },()=>
    console.log(this.state.updatedValue)

        // fetch('http://localhost:4000/api/users/register' , {
    //   method: "POST",
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // })
    // .then((result) => result.json())
    // .then((info) => { console.log(info); })
    );
  }

  render() {
    const { classes } = this.props;

   
    function renderTicketStatusRow(ticketStatusType) {
      return (<MenuItem value={ticketStatusType.id}>{ticketStatusType.name}</MenuItem>);
    }
    function renderTicketSourceRow(ticketSource) {
      return (<MenuItem value={ticketSource.id}>{ticketSource.name}</MenuItem>);
    }
    function renderCompanyRow(company) {
      return (<MenuItem value={company.id}>{company.name}</MenuItem>);
    }
    function renderEmployeeRow(employee) {
      return (<MenuItem value={employee.id}>{employee.firstName}</MenuItem>);
    }
    function renderContactRow(contact) {
      return (<MenuItem value={contact.id}>{contact.firstName}</MenuItem>);
    }

  return (
    <div>
        <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
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
          onChange={this.handleChange}
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
          Ticket Sources
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.ticketSourceValue}
          onChange={this.handleChangeticketSourceValue.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.ticketSource.map(renderTicketSourceRow)}
        </Select>
      </FormControl>


<FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        //ref={inputLabel} 
        id="demo-simple-select-outlined-label">
          Ticket Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.ticketStatusTypeValue}
          onChange={this.handleChangeticketStatusTypeValue.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.ticketStatusType.map(renderTicketStatusRow)}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        //ref={inputLabel} 
        id="demo-simple-select-outlined-label">
          Assigned To
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.employeeValue}
          onChange={this.handleemployeeeValue.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.employee.map(renderEmployeeRow)}
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
        </div>

    
   
      
    </div>
  );
}}

export default  withStyles(useStyles)(CreateTicket);