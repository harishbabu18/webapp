import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import {SERVER_URL} from '../config';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

class CreateCompany extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          companyName: '',
          companyDateCreated:'',
          companyDescription:'',
          updatedValue:'',
          
      }
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


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/company', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateCreated:this.state.companyDateCreated,
        description:this.state.companyDescription,
        name:this.state.companyName
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Company ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.response.data.errors;

      console.error("The Error Message is "+error)


    this.setState({updatedValue})
    } )
    };



  render() {
    const { classes } = this.props;
   
      return(

        <Grid container component="main" className={classes.root}>
        <Grid item  sm={12}component={Paper} elevation={6} square>
     <Paper square>
         <ButtonGroup fullWidth aria-label="full width outlined button group">
         <Button href="/admin/company/list">List company</Button>
         <Button href="/admin/company/create">Create company</Button>
       </ButtonGroup>
         </Paper>
         </Grid>
   <Grid item  sm={12} md={6} component={Paper} elevation={6} square>


          <div>
               <div  className={classes.container}>
          <form onSubmit={this.handleSubmit} >
        <Typography component="h1" variant="h5" inline>
                Create Company
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


</Grid>
<Grid item  sm={12} md={6} square>
<Grid item  sm={12} component={Paper} square>



 </Grid>
 <Grid item  sm={12} component={Paper} square>
  
 </Grid>
</Grid>
</Grid>
      )



}
      }

export default  withStyles(useStyles)(CreateCompany);