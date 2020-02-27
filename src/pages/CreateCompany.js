import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {SERVER_URL} from '../config';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Email from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import LanguageIcon from '@material-ui/icons/Language';
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

    },
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
class CreateCompany extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          companyName: '',
          companyDateCreated:'',
          companyDescription:'',
          officeType:[],
          officeTypeValue:'',
          addressValue:'',
          addressTwoValue:'',
          countryValue:'',
          stateValue:'',
          zipValue:'',
          mobileValue:'',
          websiteValue:'',
          emailValue:'',
          faxValue:'',
          userValue:'',
          
      }
    }

    componentDidMount(){
        
    fetch(SERVER_URL+'/officeType')
    .then(r => r.json())
    .then(json => this.setState({officeType: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
    console.log("Logged In User is "+JSON.parse(localStorage.auth).username);
    console.log(this.state);
    const url = SERVER_URL+"/userByUsername?username="+JSON.parse(localStorage.auth).username;
    fetch(url)
    .then(r => r.json())
    .then(json => this.setState({userValue: json.id}))
    .catch(error => console.error('Error retrieving Companies: ' + error));

    }
  

  handleCompanyNameValue=(event)=>{
    this.setState({companyName:event.target.value});
    
  }

  handleCompanyDateValue=(event)=>{
    this.setState({companyDateCreated:event.target.value});
    
  }

  handleCompanyDescription=(event)=>{
    this.setState({companyDescription:event.target.value});
    
  }

  handleChangeMobileValue=(event)=>{
    this.setState({mobileValue:event.target.value})
  }

  handleChangeWebsiteValue=(event)=>{
    this.setState({websiteValue:event.target.value})
  }

  handleChangeEmailValue=(event)=>{
    this.setState({emailValue:event.target.value})
  }

  handleChangeFaxValue=(event)=>{
    this.setState({faxValue:event.target.value})
  }

  handleOfficeTypeValue=(event)=>{
    this.setState({officeTypeValue:event.target.value});
    
  }

  handleChangeAddressValue=(event)=>{
    this.setState({addressValue:event.target.value})
  }

  handleChangeAddressTwoValue=(event)=>{
    this.setState({addressTwoValue:event.target.value})
  }

  handleChangeCountryValue=(event)=>{
    this.setState({countryValue:event.target.value})
  }

  handleChangeStateValue=(event)=>{
    this.setState({stateValue:event.target.value})
  }

  handleChangeZipValue=(event)=>{
    this.setState({zipValue:event.target.value})
  }

  handleSubmit=(event)=>{
    event.preventDefault()

     let CompanyDetail={
      establishedDate:this.state.companyDateCreated,
      description:this.state.companyDescription,
      name:this.state.companyName,
      mobile:this.state.mobileValue,
      website:this.state.websiteValue,
      email:this.state.emailValue,
      fax: this.state.faxValue,
      officeType:this.state.officeTypeValue,
      addresslineone: this.state.addressValue,
      addresslinetwo:this.state.addressTwoValue,
      country: this.state.countryValue,
      state:this.state.stateValue,
      zip: this.state.zipValue,
      user:this.state.userValue
    }

    console.log("Company Details "+CompanyDetail.establishedDate)
    console.log("Company Details "+CompanyDetail.description)
    console.log("Company Details "+CompanyDetail.name)
    console.log("Company Details "+CompanyDetail.mobile)
    console.log("Company Details "+CompanyDetail.website)
    console.log("Company Details "+CompanyDetail.email)
    console.log("Company Details "+CompanyDetail.fax)
    console.log("Company Details "+CompanyDetail.officeType)
    console.log("Company Details "+CompanyDetail.addresslineone)
    console.log("Company Details "+CompanyDetail.addresslinetwo)
    console.log("Company Details "+CompanyDetail.country)
    console.log("Company Details "+CompanyDetail.state)
    console.log("Company Details "+CompanyDetail.zip)
    console.log("Company Details "+CompanyDetail.user)
   


    fetch(SERVER_URL+'/company', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(CompanyDetail)
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
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.response.data.errors;

      console.error("The Error Message is "+error)


    this.setState({updatedValue})
    } )
    };

    handleclear=(event)=>{
      event.preventDefault()
      document.getElementById("create-course-form").reset()

      this.setState( {
        companyDateCreated:'',
        companyDescription:'',
        companyName:'',
        mobileValue:'',
        websiteValue:'',
        emailValue:'',
        faxValue:'',
        officeTypeValue:'',
        addressValue:'',
        addressTwoValue:'',
        countryValue:"",
        stateValue:'',
        zipValue:'',
      })

    }



  render() {
    const { classes } = this.props;
   
      return(

        <div  component="main" className={classes.root}  >
        <div  className={classes.root}  >
        <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button className={classes.content} href="/addressbook/company/list">List Company</Button>
         <Button className={classes.content} href="/addressbook/company/create">Create Company</Button>
        </ButtonGroup>
         </div>
         <Card>
          <form id="create-course-form" onSubmit={this.handleSubmit} >
            <CardContent>

    <Grid container component="main" className={classes.root}>

    <Grid item  sm={12} md={4} >


   <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Company Profile
   </Typography>
   <TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Company Name"
          style={{ margin: 8 }}
          placeholder="Company Name "
          fullWidth
          margin="normal"
          onChange={this.handleCompanyNameValue}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

          
    <form noValidate>
  <TextField
    id="date"
    label="Company Created On"
    type="date"
    defaultValue=""
    onChange={this.handleCompanyDateValue}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>

<TextField
          id="outlined-full-width"
          className={classes.textField}
          label="Company Description"
          style={{ margin: 8 }}
          placeholder="Company Description "
          fullWidth
          margin="normal"
          onChange={this.handleCompanyDescription}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        /> 

  
</Grid>
<Grid item  sm={12} md={4}  square>
<Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Contact
</Typography>
<TextField
     id="outlined-full-width"
     label="Mobile"
     style={{ margin: 8 }}
     type='number'
     placeholder="Mobile"
     fullWidth
     margin="normal"
     onChange={this.handleChangeMobileValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <PhoneAndroid />
        </InputAdornment>,
    }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Website"
     style={{ margin: 8 }}
     fullWidth
     margin="normal"
     onChange={this.handleChangeWebsiteValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <LanguageIcon />
        </InputAdornment>,
    }}
     variant="outlined"
   />

   <TextField
     id="outlined-full-width"
     label="Email"
     style={{ margin: 8 }}
     placeholder="E-Mail"
     fullWidth
     margin="normal"
     onChange={this.handleChangeEmailValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <Email />
        </InputAdornment>,
    }}
     variant="outlined"
   />
   <TextField
     id="outlined-full-width"
     label="Fax"
     style={{ margin: 8 }}
     placeholder="Fax"
     fullWidth
     margin="normal"
     onChange={this.handleChangeFaxValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        <Email />
        </InputAdornment>,
    }}
     variant="outlined"
   />
</Grid>
<Grid item  sm={12} md={4} square>
<Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
    Create Address
</Typography>


                      <TextField
                          id="demo-simple-select-outlined-label"
                          select 
                          label="Assigned To"
                          value={this.state.officeTypeValue}
                          onChange={this.handleOfficeTypeValue.bind(this)}
                          variant="outlined"
                          >
                              {this.state.officeType.map(option =>(
                                  <MenuItem key={option.id} value={option.id}>
                                      {option.name}
                                  </MenuItem>
                              ))}
                          </TextField>

<TextField
     id="outlined-full-width"
     label="Address"
     style={{ margin: 8 }}
     fullWidth
     margin="normal"
     onChange={this.handleChangeAddressValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        </InputAdornment>,
    }}
     variant="outlined"
   />

<TextField
     id="outlined-full-width"
     label="Address Line Two"
     style={{ margin: 8 }}
     fullWidth
     margin="normal"
     onChange={this.handleChangeAddressTwoValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        </InputAdornment>,
    }}
     variant="outlined"
   />
<TextField
     id="outlined-full-width"
     label="Country"
     style={{ margin: 8 }}
     fullWidth
     margin="normal"
     onChange={this.handleChangeCountryValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        </InputAdornment>,
    }}
     variant="outlined"
   />

<TextField
     id="outlined-full-width"
     label="State"
     style={{ margin: 8 }}
     fullWidth
     margin="normal"
     onChange={this.handleChangeStateValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        </InputAdornment>,
    }}
     variant="outlined"
   />

<TextField
     id="outlined-full-width"
     label="Zip"
     style={{ margin: 8 }}
     fullWidth
     margin="normal"
     onChange={this.handleChangeZipValue}
     InputLabelProps={{
       shrink: true,
     }}
     InputProps={{
      startAdornment: <InputAdornment position="start">
        </InputAdornment>,
    }}
     variant="outlined"
   />
</Grid>


</Grid>
<CardActions>
<Button type="Submit" className={classes.Button} variant="contained" size="Medium" color="primary">
          Save
      </Button>

      <Button type='Submit' onClick={this.handleclear} variant="contained" size="Medium" color="primary">
      {/* <input type="reset" defaultValue="Reset" /> */} Reset
      </Button>
    
      <div className={classes.root}>
          {this.state.updatedValue}
          {/* <Alert severity="success" color="info">
          {this.state.updatedValue}
          </Alert> */}
      </div>
      </CardActions>

  
  </CardContent>

</form>

</Card>

</div>
);
}}

export default  withStyles(useStyles)(CreateCompany);