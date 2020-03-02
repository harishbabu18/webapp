import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {SERVER_URL} from '../../config';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import MenuItem from '@material-ui/core/MenuItem';


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

class CreateProvider extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          companyValue: '',
          ticketValue:'',
          dateValue:'',
          deadlineValue:'',
          durationValue:'',
          referenceValue:'',
          commissionValue: '',
          generalInformationValue: '',
          company:[],
          ticket:[],
          reference:[],
          updatedValue:'',
        
          userValue:'',
          
      }
    }





    componentDidMount(){
        
    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({company: json}))
    .catch(error => console.error('Error retrieving company: ' + error));
   
    fetch(SERVER_URL+'/ticket')
    .then(r => r.json())
    .then(json => this.setState({ticket: json}))
    .catch(error => console.error('Error retrieving ticket: ' + error));

    fetch(SERVER_URL+'/employee')
    .then(r => r.json())
    .then(json => this.setState({reference: json}))
    .catch(error => console.error('Error retrieving Offers: ' + error));

    const url = SERVER_URL+"/userByUsername?username="+JSON.parse(localStorage.auth).username;
    fetch(url)
    .then(r => r.json())
    .then(json => this.setState({userValue: json.id}))
    .catch(error => console.error('Error retrieving User: ' + error));

    }


    handleChangeCompanyValue =(event)=>{
        this.setState({companyValue:event.target.value});
    
  }

    handleChangeTicketValue =(event)=>{
        this.setState({ticketValue:event.target.value});
    
  }

    handleChangeDateValue =(event)=>{
    this.setState({dateValue:event.target.value});
    
  }

    handleChangeDeadlineValue =(event)=>{
    this.setState({deadlineValue:event.target.value});
    
  }

    handleChangeDurationValue =(event)=>{
    this.setState({durationValue:event.target.value})
  }

    handleChangeRefernceVaue =(event)=>{
    this.setState({referenceValue:event.target.value})
  }

    handleChangeCommissionRefernceValue=(event)=>{
    this.setState({commissionValue:event.target.value})
  }

    handleChangeGeneralInformationValue=(event)=>{
    this.setState({generalInformationValue:event.target.value})
  }

    handleChangeServiceValue = (event) => {
        this.setState({serialValue:event.target.value})
    }



  handleSubmit=(event)=>{
    event.preventDefault()

    
   
     let OfferDetail={
      
        name: this.state.nameValue,
        description:this.state.descriptionValue,
        type:this.state.typeValue,
        serial:this.state.serialValue,

        purchasePrice:this.state.purchasePriceValue,
        salesPrice:this.state.saleValue,
        
        supplierValue:this.state.supplierValue,
        thresholdValue:this.state.thresholdValue,
        userValue:this.state.userValue,
        
    }
 

    fetch(SERVER_URL+'/equipment', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(OfferDetail)
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      if(typeof json.total==='undefined'){
        updatedValue="";
        if(typeof json.message==='undefined'){
          updatedValue += "Offer is Added Successfully"
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
         
        nameValue: '',
        descriptionValue:'',
        serialValue:'',
        typeValue:'',
        purchasePriceValue:'',
        saleValue:'',
        supplierValue:'',
        thresholdValue:'',
        userValue:'',
        
      })

    }



  render() {
    const { classes } = this.props;
   
      return(

        <div  component="main" className={classes.root}  >
        <div  className={classes.root}  >
          <Grid sm={6} md={12}>
          <ButtonGroup fullWidth aria-label="full width button group">

          <Button className={classes.content} href="/addressbook/provider/list">List Provider</Button>


          <Button className={classes.content} href="/addressbook/provider/create">Create Provider</Button>
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
        Create Registry
   </Typography>
                        <TextField
                            id="outlined-uncontrolled"
                            label="Supplier"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label=" VAT Number"
                            type="number"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label="Mobile Number"
                            type="number"
                            margin="normal"
                            // onChange={this.handleChangeCommissionReferenceValue}
                        
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label="E-Mail"
                            type='email'
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label="Fax"
                            type='number'
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label="Service"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

                        
                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Qualification"
                            // value={this.state.placeValue}
                            // onChange={this.handleChangePlaceValue.bind(this)}
                            variant="outlined"
                          >
                              {['Reserved', 'Qualified', 'Not Qualified'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                        <TextField
                            id="outlined-uncontrolled"
                            label="Note"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

  </div>
</Grid>
                <Grid item  sm={12} md={6} className={classes.content}>
                <div className={classes.content}>

                <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Address
                </Typography>

                        <TextField
                            id="outlined-uncontrolled"
                            label="Address"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

                          <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Region"
                            // value={this.state.placeValue}
                            // onChange={this.handleChangePlaceValue.bind(this)}
                            variant="outlined"
                          >
                              {['Bengaluru', 'Mangaluru', 'Tumkuru', 'Mandya'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>


                          <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Province"
                            // value={this.state.placeValue}
                            // onChange={this.handleChangePlaceValue.bind(this)}
                            variant="outlined"
                          >
                              {['Bengaluru', 'Mangaluru', 'Tumkuru', 'Mandya'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>


                          <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Common"
                            // value={this.state.placeValue}
                            // onChange={this.handleChangePlaceValue.bind(this)}
                            variant="outlined"
                          >
                              {['Bengaluru', 'Mangaluru', 'Tumkuru', 'Mandya'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                          id="outlined-uncontrolled"
                          label="Postal Code"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Person"
                            // value={this.state.placeValue}
                            // onChange={this.handleChangePlaceValue.bind(this)}
                            variant="outlined"
                          >
                              {['Bengaluru', 'Mangaluru', 'Tumkuru', 'Mandya'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                </div>

               
            </Grid>


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

  </div>
  </CardContent>

</form>
</Card>
</div>


</div>
);
}}

export default  withStyles(useStyles)(CreateProvider);