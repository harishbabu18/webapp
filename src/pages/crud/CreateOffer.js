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
        width:'100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,

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
class CreateOffer extends React.Component {


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

          <Button className={classes.content} href="/commercial/offer/list">List Offer</Button>


          <Button className={classes.content} href="/commercial/offer/create">Create Offer</Button>
          </ButtonGroup>

          </Grid>
         </div>

         <div className={classes.content}>

         <Card>
          <form id="create-course-form" onSubmit={this.handleSubmit} >
            <CardContent >
            <div className={classes.content}>


    <Grid container component="main">
    <Grid item  sm={12} md={4} >
      <div className={classes.root}>


   <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Offer
   </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Company"
                            value={this.state.companyValue}
                            onChange={this.handleChangeCompanyValue.bind(this)}
                            variant="outlined"
                          >
                            {this.state.company.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Ticket"
                            value={this.state.ticketValue}
                            onChange={this.handleChangeTicketValue.bind(this)}
                            variant="outlined"
                        >
                            {this.state.ticket.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="Created Date"
                            label="Created On"
                            type="date"
                            defaultValue=""
                            onChange={this.handleChangeDateValue}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />

                        <TextField
                            id="Deadline"
                            label="Deadline "
                            type="date"
                            defaultValue=""
                            onChange={this.handeChangeDeadlineValue}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />

                       
                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Duration"
                            value={this.state.durationValue}
                            onChange={this.handleChangeDurationValue.bind(this)}
                            variant="outlined"
                        >
                            {['1 Year','2 Year', '3 Year', '5 Year'].map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        
                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Reference"
                            // value={this.state.referenceValue}
                            // onChange={this.handleChangeReferenceValue.bind(this)}
                            variant="outlined"
                        >
                            {['Yaro','Neenu'].map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-uncontrolled"
                            label="Reference Commission"
                            type="number"
                            margin="normal"
                            // onChange={this.handleChangeCommissionReferenceValue}
                        
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-uncontrolled"
                            label="General Information"
                            margin="normal"
                            // onChange={this.handleChangeGeneralInformationValue}
                            variant="outlined"
                        />

  </div>
</Grid>
                <Grid item  sm={12} md={4} className={classes.content}>
                <div className={classes.content}>

                <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Service
                </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Service"
                            // value={this.state.serviceValue}
                            // onChange={this.handleChangeServiceValue.bind(this)}
                            variant="outlined"
                          >
                              {['DD45','KX67','GXC454'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Place"
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
                          label="Number Of Intervention"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Cost Of Service"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                </div>

               
            </Grid>

            <Grid item  sm={12} md={4} className={classes.content}>
                <div className={classes.content}>

                <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Facility
                </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Crew"
                            // value={this.state.serviceValue}
                            // onChange={this.handleChangeServiceValue.bind(this)}
                            variant="outlined"
                          >
                              {['DD45','KX67','GXC454'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>


                          <TextField
                          id="outlined-uncontrolled"
                          label="Typology"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Quantity"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                </div>

               
            </Grid>

            <Grid item  sm={12} md={4} className={classes.content}>
                <div className={classes.content}>

                <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Product
                </Typography>

                        <TextField
                            id="demo-simple-select-outlined-label"
                            select 
                            label="Product"
                            // value={this.state.serviceValue}
                            // onChange={this.handleChangeServiceValue.bind(this)}
                            variant="outlined"
                          >
                              {['DD45','KX67','GXC454'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

                          

                          <TextField
                          id="outlined-uncontrolled"
                          label="Quantity "
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Cost "
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                </div>

               
            </Grid>

            <Grid item  sm={12} md={4} className={classes.content}>
                <div className={classes.content}>

                <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Payment
                </Typography>


                          <TextField
                          id="outlined-uncontrolled"
                          label="Payment Method"
                          margin="normal"
                        //   onChange={this.handleChangeInterventionValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Taxable"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Discount"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />
                          <TextField
                          id="outlined-uncontrolled"
                          label="IVA"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />

                          <TextField
                          id="outlined-uncontrolled"
                          label="total"
                          type="number"
                          margin="normal"
                        //   onChange={this.handleChangeCostOfServiveValue}
                      
                          variant="outlined"
                          />



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

export default  withStyles(useStyles)(CreateOffer);