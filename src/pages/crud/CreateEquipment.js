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
        justify:"center",
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,
        display:'Center',

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
class CreateEquipment extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          nameValue: '',
          descriptionValue:'',
          serialValue:'',
          typeValue:'',

          purchasePriceValue:'',
          saleValue:'',


          fields: {},
          errors: {},

          type:[],

          supplierValue:'',
          thresholdValue:'',
          userValue:'',
          
      }
    }





    componentDidMount(){
        
    fetch(SERVER_URL+'/officeType')
    .then(r => r.json())
    .then(json => this.setState({type: json}))
    .catch(error => console.error('Error retrieving Equipment: ' + error));
    console.log("Logged In User is "+JSON.parse(localStorage.auth).username);
    console.log(this.state);
    const url = SERVER_URL+"/userByUsername?username="+JSON.parse(localStorage.auth).username;
    fetch(url)
    .then(r => r.json())
    .then(json => this.setState({userValue: json.id}))
    .catch(error => console.error('Error retrieving Equipment: ' + error));

    }


  handleChangeNameValue=(event)=>{
    this.setState({nameValue:event.target.value});
    
  }

  handleChangeDescriptionVAlue=(event)=>{
    this.setState({descriptionValue:event.target.value});
    
  }

  handleChangeSerialValue=(event)=>{
    this.setState({serialValue:event.target.value});
    
  }

  handleChangeTypeValue=(event)=>{
    this.setState({typeValue:event.target.value});
    
  }

  handleChangeSupplierValue=(event)=>{
    this.setState({supplierValue:event.target.value})
  }

  handleChangeThresholdValue=(event)=>{
    this.setState({thresholdValue:event.target.value})
  }

  handleChangePurchasePriceValue=(event)=>{
    this.setState({purchasePriceValue:event.target.value})
  }

  handleChangeSalePriceValue=(event)=>{
    this.setState({saleValue:event.target.value})
  }



  handleSubmit=(event)=>{
    event.preventDefault()

    
   
     let EquipmentDetail={
      
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
      body: JSON.stringify(EquipmentDetail)
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      if(typeof json.total==='undefined'){
        updatedValue="";
        if(typeof json.message==='undefined'){
          updatedValue += "Equpment is Added Successfully"
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

          <Button className={classes.content} href="/warehouse/equipment/list">List Equipment</Button>


          <Button className={classes.content} href="/warehouse/equipment/create">Create Equipment</Button>
          </ButtonGroup>

          </Grid>
         </div>

         <div className={classes.content}>

         <Card>
          <form id="create-course-form" 
        //   onSubmit={this.handleSubmit}
           >
            <CardContent >
            <div className={classes.content}>


    <Grid container component="main">
    <Grid item  sm={12} md={6} >
      <div className={classes.root}>


   <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Equipment
   </Typography>
                        <TextField
                          id="outlined-uncontrolled"
                          label="Name"
                          margin="normal"
                          onChange={this.handleChangeName}
                      
                          variant="outlined"
                        />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Description"
                          margin="normal"
                          onChange={this.handleChangeDescriptionVAlue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Serial"
                          margin="normal"
                          onChange={this.handleChangeSerialValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Type"
                          value={this.state.typeValue}
                          onChange={this.handleChangeTypeValue.bind(this)}
                          variant="outlined"
                          >
                              {this.state.type.map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

  </div>
</Grid>
                <Grid item  sm={12} md={6} className={classes.content}>
                <div className={classes.content}>

                <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                    Supplier
                </Typography>

                <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Supplier"
                          value={this.state.supplierValue}
                          onChange={this.handleChangeSupplierValue.bind(this)}
                          variant="outlined"
                          >
                              {['idli','Vada','Sambar'].map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option}
                                  </MenuItem>
                              ))}
                          </TextField>

                          <TextField
                          id="outlined-uncontrolled"
                          label="Threshold"
                          type="number"
                          margin="normal"
                          onChange={this.handleChangeThresholdValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Purchase Price"
                          type="number"
                          margin="normal"
                          onChange={this.handleChangePurchasePriceValue}
                      
                          variant="outlined"
                          />

                        <TextField
                          id="outlined-uncontrolled"
                          label="Sales Price"
                          type="number"
                          margin="normal"
                          onChange={this.handleChangeSalesValue}
                      
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

export default  withStyles(useStyles)(CreateEquipment);