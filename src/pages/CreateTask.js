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
  root: {
   
    
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width:'85%',
      },
      [theme.breakpoints.up('lg')]: {
        width: 295,

    },

    }
  },


  title: {
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1,0),
  },
  Button: {
    width: '100%',
  }


});
 
class CreateTask extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      // description:[],
      publicmessage :'',
      personalnote:'',
      ticketid: [],
      ticketidValue: '',
      assignto:[],
      assigntoValue: '',
      assignby:[],
      assignbyValue: '',
      updatedValue:''
      
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
    console.log(event.target.value)

  }

  handleSubmit=(event)=>{
    event.preventDefault()
  
    let task ={
      ticket:this.state.ticketidValue,
      assignedTo:this.state.assigntoValue,
      assignedBy:this.state.assigntoValue,
      personalNote:this.state.personalnote,
      publicMessage:this.state.publicmessage,
   
    }


    fetch(SERVER_URL+'/task', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(r=> r.json()).then(json=>{let updatedValue = this.state.updatedValue;
      updatedValue = "Task "+json.id+" is Added Successfully";
      this.setState({updatedValue})
    })
    };

  render() {
    const { classes } = this.props;

   
    function renderTicketidRow(ticketid) {
      return (<MenuItem value={ticketid.id}>{ticketid.id}</MenuItem>);
    }
    
    function renderAssigntoRow(assignto) {
      return (<MenuItem value={assignto.id}>{assignto.firstName}</MenuItem>);
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
        id="demo-simple-select-outlined-label">
          Assign to
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.assigntoValue}
          onChange={this.handleChangeassigntoValue.bind(this)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.assignto.map(renderAssigntoRow)}
        </Select>
      </FormControl>



     


        <Button className={classes.textField} type="Submit">Save</Button>
        </form>
        {this.state.updatedValue}
        </div>   
    </div>
  );
}}

export default  withStyles(useStyles)(CreateTask);