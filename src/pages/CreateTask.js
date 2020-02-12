import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SERVER_URL} from '../config';

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


class CreateTask extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      // description:[],
      publicmessage :'',
      publicmessageValue:'',
      personalnoteValue:'',
      personalnote:'',
      ticketid: [],
      ticketidValue: '',
      assignto:[],
      assigntoValue: '',
      assignby:[],
      assignbyValue: '',
      
    }
  }
  componentDidMount() {
    fetch(SERVER_URL+'/ticket')
    .then(r => r.json())
    .then(json => this.setState({ticketid: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/employee')
    .then(r => r.json())
    .then(json => this.setState({assignto: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

  
  }

  handleChange=(event)=>{
    this.setState({publicmessage:event.target.value});
  }
  handleChange1=(event)=>{
    this.setState({personalnote:event.target.value});
  }
  handleChangeticketidValue(event){
    this.setState({ticketidValue:event.target.value});

  }

  handleChangeassigntoValue(event){
    this.setState({assigntoValue:event.target.value});

  }

  handleChangeassignbyValue(event){
    this.setState({assigntoValue:event.target.value});
    
  }


  handleSubmit=(event)=>{
    event.preventDefault()
    // this.setState({
    //   description:this.state.descriptionValue,
    //   urgent:false,
    //   import:false,
    //   ticketSource:this.state.ticketSourceValue,
    //   ticketStatus:this.state.ticketStatusTypeValue,
    //   createdBy:this.state.employeeValue,
    //   assignedTo:this.state.employeeValue,
    //   company:this.state.companyValue,
    //   contact:this.state.contactValue
    // }
    // ,()=>
    // console.log(this.state.descriptionValue)
    // );
    // let ticketsValue ={
    //   description:this.state.descriptionValue,
    //   urgent:false,
    //   import:false,
    //   ticketSource:this.state.ticketSourceValue,
    //   ticketStatus:this.state.ticketStatusTypeValue,
    //   createdBy:this.state.employeeValue,
    //   assignedTo:this.state.employeeValue,
    //   company:this.state.companyValue,
    //   contact:this.state.contactValue
    // }

    fetch(SERVER_URL+'/ticket', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:this.state.ticketidValue,
        assignedTo:this.state.assigntoValue,
        assignBy:this.state.assignbyValue,
        personalNote:this.state.personalNote,
        publicMessage:this.state.employeeValue,
     
      })
    })
    };

  render() {
    const { classes } = this.props;

   
    function renderTicketidRow(ticketid) {
      return (<MenuItem value={ticketid.id}>{ticketid.name}</MenuItem>);
    }
    function renderAssignbyRow(assignby) {
      return (<MenuItem value={assignby.id}>{assignby.name}</MenuItem>);
    }
    function renderAssigntoRow(assignto) {
      return (<MenuItem value={assignto.id}>{assignto.name}</MenuItem>);
    }
 
  return (
    <div>
        <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Task Profile
              </Typography>

      <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Public Message"
          style={{ margin: 8 }}
          placeholder="Public Message "
          fullWidth
          margin="normal"
          onChange={this.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

      <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Personal Note"
          style={{ margin: 8 }}
          placeholder="Personal note"
          fullWidth
          margin="normal"
          onChange={this.handleChange1}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel
         //ref={inputLabel}
          id="demo-simple-select-outlined-label">
          Ticket id
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.ticketidValue}
          onChange={this.handleChangeticketidValue.bind(this)}
         // labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.ticketid.map(renderTicketidRow)}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        //ref={inputLabel} 
        id="demo-simple-select-outlined-label">
          Assign to
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.assigntoValue}
          onChange={this.handleChangeassigntoValue.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.assignto.map(renderAssigntoRow)}
        </Select>
      </FormControl>


<FormControl variant="outlined" className={classes.textField}>
        <InputLabel 
        //ref={inputLabel} 
        id="demo-simple-select-outlined-label">
          Assign by
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.ticketStatusTypeValue}
          onChange={this.handleChangeassignbyValue.bind(this)}
          //labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.assignby.map(renderAssignbyRow)}
        </Select>
      </FormControl>

     

      {/* <FormControl variant="outlined" className={classes.textField}>
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
      </FormControl> */}
        <Button className={classes.textField} type="Submit">Save</Button>
        </form>
        </div>   
    </div>
  );
}}

export default  withStyles(useStyles)(CreateTask);