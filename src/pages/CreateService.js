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
import Paper from '@material-ui/core/Paper';

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


class CreateServices extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
       
          servicename :'',
          specification:'',
          
          price: '',
          deadlinedate: ''
        }
      }
    

      handleChangeName=(event)=>{
        this.setState({servicename:event.target.value});
    
      }
    
      handleChangeSpecification=(event)=>{
        this.setState({specification:event.target.value});
       
    
      }
      handleChangePrice=(event)=>{
        this.setState({price:event.target.value});
       
    
      }
      handleChangeDeadline=(event)=>{
        this.setState({deadlinedate:event.target.value});
       
    
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

    fetch(SERVER_URL+'/company', { 
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
          servicename:'',
          urgent:false,
          import:false,
          specification:'',
          price:'',
          deadline:'',
         
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
       <Button className={classes.content} href="/service/list">List Service</Button>
       <Button className={classes.content} href="/service/create">Create Service</Button>
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
                      Create Services
                  </Typography>
                  <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Service Name"
          style={{ margin: 8 }}
          placeholder="Service Name"
          fullWidth
          margin="normal"
          onChange={this.handleChangeName}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

      <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Technical Specification"
          style={{ margin: 8 }}
          placeholder="Technical Specification"
          fullWidth
          margin="normal"
          onChange={this.handleChangeSpecification}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
                <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Unit Price"
          style={{ margin: 8 }}
          placeholder="Unit Price"
          fullWidth
          margin="normal"
          onChange={this.handleChangePrice}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

<TextField
    id="date"
    label="Deadline date"
    type="date"
    onChange={this.handleChangeDeadline}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />

                        


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

export default  withStyles(useStyles)(CreateServices);