import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {SERVER_URL} from '../../config';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import MenuItem from '@material-ui/core/MenuItem';


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
          userValue:'',
      }
    }

    componentDidMount() {
      
      fetch(SERVER_URL+'/transport')
      .then(r => r.json())
      .then(json => this.setState({transport: json}))
      .catch(error => console.error('Error retrieving Tickrts: ' + error));
      console.log("Logged In User is "+JSON.parse(localStorage.auth).username);
      console.log(this.state);
      const url = SERVER_URL+"/userByUsername?username="+JSON.parse(localStorage.auth).username;
      fetch(url)
      .then(r => r.json())
      .then(json => this.setState({userValue: json.id}))
      .catch(error => console.error('Error retrieving Companies: ' + error));
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

    
   
     let TransportDetail={
      
      unloading:this.state.unloadingValue,
        loading:this.state.loadingValue,
        schedule:this.state.scheduleValue,
        user:this.state.userValue
        
    }
 

    fetch(SERVER_URL+'/transport', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TransportDetail)
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      if(typeof json.total==='undefined'){
        updatedValue="";
        if(typeof json.message==='undefined'){
          updatedValue += "Company is Added Successfully"
        } 
        else
        {
          updatedValue +=json.message;
        }
      }
      else{
         updatedValue = "Errors Are "
         for(let i=0;i<json.total;i++){
          updatedValue +=json._embedded.errors[i].message
           
         }

      }
      
    this.setState({updatedValue})
    }).catch(error =>{
     
      console.error("The Error Message is "+error)


   
    } )
    

    
   
  };


    handleclear=(event)=>{
      event.preventDefault()
      document.getElementById("create-course-form").reset()

      this.setState( {
         
        unloadingValue: '',
        loadingValue:'',
        scheduleValue:'',
        updatedValue:'',
        userValue:'',
        
      })

    }



  render() {
    const { classes } = this.props;
    function renderLoadingRow(address) {
        return (<MenuItem value={address.id}>{address.addresslineone}</MenuItem>);
      }

      function renderUnloadingRow(address) {
        return (<MenuItem value={address.id}>{address.addresslineone}</MenuItem>);
      }

      return(
        <div  component="main" className={classes.root}  >
        <div  className={classes.root}  >
          <Grid sm={6} md={12}>
          <ButtonGroup fullWidth aria-label="full width button group">

          <Button className={classes.content} href="/warehouse/transport/list">List Transport</Button>


          <Button className={classes.content} href="/warehouse/transport/create">Create Transport</Button>
          </ButtonGroup>

          </Grid>
         </div>

         <div className={classes.content}>

         <Card>
          <form id="create-course-form" onSubmit={this.handleSubmit} >
            <CardContent >
            <div className={classes.content}>


    <Grid container component="main">
    <Grid item  sm={12} md={6} >
      <div className={classes.root}>


   <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
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
</div>

</Grid>
<CardActions>
<ButtonGroup fullWidth aria-label="full width outlined button group">
<Button type="Submit" className={classes.Button} variant="contained" size="Medium" color="primary">
          Save
      </Button>
      </ButtonGroup>

      <ButtonGroup fullWidth aria-label="full width outlined button group">
      <Button type='Submit' onClick={this.handleclear} variant="contained" size="Medium" color="primary">
      {/* <input type="reset" defaultValue="Reset" /> */} Reset
      </Button>
      </ButtonGroup>
    
      <div className={classes.root}>
          {this.state.updatedValue}
          {/* <Alert severity="success" color="info">
          {this.state.updatedValue}
          </Alert> */}
      </div>
      </CardActions>
      </Grid>

  </div>
  </CardContent>

</form>
</Card>
</div>


</div>
      )



}
      }

export default  withStyles(useStyles)(CreateTransport);