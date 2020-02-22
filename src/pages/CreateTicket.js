import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {SERVER_URL} from '../config';
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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

});


class CreateTicket extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      submitStatus:'',
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
      updatedValue:'Status',
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
    fetch(SERVER_URL+'/ticket', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description:this.state.descriptionValue,
        urgent:false,
        import:false,
        ticketSource:this.state.ticketSourceValue,
        ticketStatus:this.state.ticketStatusTypeValue,
        createdBy:this.state.employeeValue,
        assignedTo:this.state.employeeValue,
        company:this.state.companyValue,
        contact:this.state.contactValue
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Ticket ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})

    } )
    };

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

    <Grid container component="main" className={classes.root}>
         <Grid item  sm={12}component={Paper} elevation={6} square>
      <Paper square>
          <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button href="/admin/ticket/list">List Ticket</Button>
          <Button href="/admin/ticket/create">Create ticket</Button>
        </ButtonGroup>
          </Paper>
          </Grid>
    <Grid item  sm={12} md={6} component={Paper} elevation={6} square>

    
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
        <div className={classes.root}>
        {this.state.updatedValue}
        {/* <Alert severity="success" color="info">
        {this.state.updatedValue}
        </Alert> */}
        </div>

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

export default  withStyles(useStyles)(CreateTicket);