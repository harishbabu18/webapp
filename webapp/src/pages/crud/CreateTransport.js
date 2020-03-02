import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


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

class CreateTransport extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          transport:[],
          address:[],
          unloadingValue: '',
          loadingValue:'',
          scheduleValue:'',
          updatedValue:'',
      }
    }

    componentDidMount() {
    fetch(SERVER_URL+'/transport')
    .then(r => r.json())
    .then(json => this.setState({transport: json}))
    .catch(error => console.error('Error retrieving Transport: ' + error));
    }


    componentDidMount() {
        fetch(SERVER_URL+'/address')
        .then(r => r.json())
        .then(json => this.setState({address: json}))
        .catch(error => console.error('Error retrieving Transport: ' + error));
        }
 
  handleChangeUnloadingValue=(event)=>{
    this.setState({unloadingValue:event.target.value});
    
  }

  handleChangeLoadingValue=(event)=>{
    this.setState({loadingValue:event.target.value});

  }
  handleChangeScheduleValue=(event)=>{
    this.setState({scheduleValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/transport', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        unloading:this.state.unloadingValue,
        loading:this.state.loadingValue,
        schedule:this.state.scheduleValue
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Transport ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})
    } )
    };



  render() {
    const { classes } = this.props;
    function renderLoadingRow(address) {
        return (<MenuItem value={address.id}>{address.addresslineone}</MenuItem>);
      }

      function renderUnloadingRow(address) {
        return (<MenuItem value={address.id}>{address.addresslineone}</MenuItem>);
      }

      return(
          <div>
               <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Transport
              </Typography>


<FormControl variant="outlined" className={classes.textField}>
<InputLabel
 //ref={inputLabel}
  id="demo-simple-select-outlined-label">
  Loading
</InputLabel>
<Select
  labelId="demo-simple-select-outlined-label"
  id="demo-simple-select-outlined"
  value={this.state.loadingValue}
  onChange={this.handleChangeLoadingValue.bind(this)}
 // labelWidth={labelWidth}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {this.state.address.map(renderLoadingRow)}
</Select>
</FormControl>

<FormControl variant="outlined" className={classes.textField}>
<InputLabel
 //ref={inputLabel}
  id="demo-simple-select-outlined-label">
  UnLoading
</InputLabel>
<Select
  labelId="demo-simple-select-outlined-label"
  id="demo-simple-select-outlined"
  value={this.state.unloadingValue}
  onChange={this.handleChangeUnloadingValue.bind(this)}
 // labelWidth={labelWidth}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {this.state.address.map(renderUnloadingRow)}
</Select>
</FormControl>

<form noValidate>
  <TextField
    id="Schedule Date"
    label="Schedule Date"
    placeholder="Schedule Date"
    type="date"
    defaultValue=""
    onChange={this.handleChangeScheduleValue}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>


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

export default  withStyles(useStyles)(CreateTransport);