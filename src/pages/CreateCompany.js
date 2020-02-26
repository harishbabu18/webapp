import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import {SERVER_URL} from '../config';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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

        <div  component="main" className={classes.root}  >
        <div  className={classes.root}  >
     {/* <Paper > */}
         <ButtonGroup fullWidth aria-label="full width outlined button group">
         <Button className={classes.content} href="/admin/company/list">List Company</Button>
         <Button className={classes.content} href="/admin/company/create">Create Company</Button>
       </ButtonGroup>
         {/* </Paper> */}
         </div>
   <Grid item  sm={12} md={4} className={classes.content} >

   
   <div>

       <Card className={classes.root} variant="outlined">
           <CardContent >
               <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                   Create Company Profile
               </Typography>

               <form  onSubmit={this.handleSubmit} >
                   <Grid item >
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
 <CardActions>

 <Grid item  sm={12} md={4} className={classes.content} >


  </Grid>


<Button type="Submit" variant="contained" size="small" color="primary">
    Save
</Button>

<div className={classes.root}>
    {this.state.updatedValue}
    {/* <Alert severity="success" color="info">
    {this.state.updatedValue}
    </Alert> */}
</div>

</CardActions>
</Grid>

</form>

</CardContent>
</Card>

</div>

</Grid>
<Grid item  sm={12} md={6} square>
<Grid item  sm={12} component={Paper} square>



</Grid>
<Grid item  sm={12} component={Paper} square>

</Grid>
</Grid>
</div>
);
}}

export default  withStyles(useStyles)(CreateCompany);