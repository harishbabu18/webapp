import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import {SERVER_URL} from '../config';

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
      )



}
      }

export default  withStyles(useStyles)(CreateCompany);