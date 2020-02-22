import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Select from '@material-ui/core/Select';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../../config';
import { Button ,ButtonGroup} from '@material-ui/core';
import Card from '@material-ui/core/Card';
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



class CreatePhone extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          company:[],
          companyValue: '',
          contact:[],
          contactValue:'',
          phoneValue:'',
      }
    }

    componentDidMount() {
    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({company: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/contact')
    .then(r => r.json())
    .then(json => this.setState({contact: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
    }

  handleChangeCompanyValue=(event)=>{
    this.setState({companyValue:event.target.value});
    
  }

  handlecontactValue=(event)=>{
    this.setState({contactValue:event.target.value});

  }
  handlephoneValue=(event)=>{
    this.setState({phoneValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/mobile', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mobile:this.state.phoneValue,
        company:this.state.companyValue,
        contact:this.state.contactValue
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Phone ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})
    } )
    };



  render() {
    const { classes } = this.props;
    function renderCompanyRow(company) {
        return (<MenuItem value={company.id}>{company.name}</MenuItem>);
      }

      function renderContactRow(contact) {
        return (<MenuItem value={contact.id}>{contact.firstName}</MenuItem>);
      }

      return(
        <div  component="main" className={classes.root}  >
        <div  className={classes.root}  >
        <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button className={classes.content} href="/admin/ticket/list">List Ticket</Button>
          <Button className={classes.content} href="/admin/ticket/create">Create ticket</Button>
        </ButtonGroup>
       </div>
      <Grid item  sm={12} md={6} className={classes.content} >

 
        <div>



          <Card className={classes.root} variant="outlined">
            <CardContent >
              <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                Create Phone 
              </Typography>
              <form  onSubmit={this.handleSubmit} >
                <Grid item >
                  <TextField
                  id="outlined-uncontrolled"
                  label="Mobile"
                  type="mobile"
                  margin="normal"
                  onChange={this.handlephoneValue}
                  variant="outlined"
                  />

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
                      label="Contact"
                      value={this.state.contactValue}
                      onChange={this.handlecontactValue.bind(this)}
                      variant="outlined"
                      >
                          {this.state.contact.map(option =>(
                              <MenuItem key={option.id} value={option.id}>
                                  {option.firstName}
                              </MenuItem>
                          ))}
                      </TextField>

                      <CardActions>

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

      )



}
      }

export default  withStyles(useStyles)(CreatePhone);