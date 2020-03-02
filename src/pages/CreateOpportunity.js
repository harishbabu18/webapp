import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
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
 

class CreateOpportunity extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
     descriptionValue:'',
     clientValue: '',
    client:[],
      contactValue: '',
      contact:[],
      ownerValue: '',
      owner:[],
      startingdate:'',
     closingdate:'',
     source:'',
     services:[],
     servicesValue:'',
      updatedValue:'Status',
      
    }
  }
  componentDidMount() {
    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({client: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/contact')
    .then(r => r.json())
    .then(json => this.setState({contact: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/employee')
    .then(r => r.json())
    .then(json => this.setState({owner: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/service')
    .then(r => r.json())
    .then(json => this.setState({services: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
   
  }

  handleChange=(event)=>{
    this.setState({descriptionValue:event.target.value});
  }

  handleChangeClient(event){
    this.setState({clientValue:event.target.value});

  }

  handleChangeContact(event){
    this.setState({contactValue:event.target.value});

  }

  handleChangeOwner(event){
    this.setState({ownerValue:event.target.value});
    
  }

  handleChangeStartingdate(event){
    this.setState({startingdate:event.target.value});

  }

  handleChangeClosingdate(event){
    this.setState({closingdate:event.target.value});

  }
  handleChangeSource(event){
    this.setState({source:event.target.value});

  }
  handleChangeServices(event){
    this.setState({servicesValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    let TicketDetails={
      description:this.state.descriptionValue,
      urgent:false,
      import:false,
      ticketSource:this.state.ticketSourceValue,
      ticketStatus:this.state.ticketStatusTypeValue,
      createdBy:this.state.employeeValue,
      assignedTo:this.state.employeeValue,
      company:this.state.companyValue,
      contact:this.state.contactValue,
      user:this.state.userValue,
    }

    console.log("Verify",TicketDetails)

    fetch(SERVER_URL+'/opportunity', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TicketDetails)
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      if(typeof json.total==='undefined'){
        updatedValue="";
        if(typeof json.message==='undefined'){
          updatedValue += "Employee is Added Successfully"
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
          descriptionValue:'',
          urgent:false,
          import:false,
          clientValue:'',
          ownerValue:'',
          source:'',
          contactValue:'',
          servicesValue:'',
          startingdate:'',
          closingdate:'',

      })

    }


  render() {
    const { classes } = this.props;

  return (

    <div>
    <div  component="main" className={classes.root}  >
          <div  className={classes.root}  >
            <Grid sm={6} md={12}>
       <ButtonGroup fullWidth aria-label="full width outlined button group">
       <Button className={classes.content} href="/commercial/opportunity/list">List Opportunity</Button>
       <Button className={classes.content} href="/commertial/opportunity/create">Create Opportunity</Button>
     </ButtonGroup>
     </Grid>
           </div>
  
           <div className={classes.content}>
  
           <Card>
            <form id="create-course-form" onSubmit={this.handleSubmit} >
              <CardContent >
              <div className={classes.content}>
  
  
      <Grid container component="main">
        <div className={classes.root}>
          {/* <Card className={classes.root} variant="outlined"> */}
              <CardContent >
                  <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                      Create Opportunity
                  </Typography>

                          <TextField
                          id="outlined-uncontrolled"
                          label="Opportunity Description"
                          margin="normal"
                          onChange={this.handleChange}
                      
                          variant="outlined"
                          />

                          <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Client"
                          value={this.state.clientValue}
                          onChange={this.handleChangeClient.bind(this)}
                          variant="outlined"
                          >
                              {this.state.client.map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Contact"
                          value={this.state.contactValue}
                          onChange={this.handleChangeContact.bind(this)}
                          variant="outlined"
                          >
                              {this.state.contact.map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Owner"
                          value={this.state.ticketStatusTypeValue}
                          onChange={this.handleChangeOwner.bind(this)}
                          variant="outlined"
                          >
                              {this.state.owner.map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>
                          <TextField
    id="date"
    label="Starting Date"
    type="date"
    onChange={this.handleChangeStartingdate}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
  <TextField
    id="date"
    label="Closing date"
    type="date"
    onChange={this.handleChangeClosingdate}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />

                        

<TextField
                          id="outlined-uncontrolled"
                          label="Source"
                          margin="normal"
                          onChange={this.handleChangeSource}
                      
                          variant="outlined"
                          />
                            <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Service"
                          // value={this.state.servicesValue}
                          // onChange={this.handleChangeServices.bind(this)}
                          variant="outlined"
                          >
                              {['jhbhb','iuhgf','hgfxc'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option}
                                  </MenuItem>
                              ))}
                          </TextField>

                        


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

  </CardContent>
  </div>
  </Grid>
  </div>
  </CardContent>
  </form>

</Card>
</div>


</div>
</div>
  );
}}

export default  withStyles(useStyles)(CreateOpportunity);