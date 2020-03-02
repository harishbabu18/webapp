import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../../config';
import { Button ,ButtonGroup} from '@material-ui/core';
import Card from '@material-ui/core/Card';


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
 

class CreateContact extends React.Component {


    constructor(props) {
      super(props);
  
      this.state = {
          
          company:[],
          companyValue: '',
          contact:[],
          contactValue:'',
          emailValue:'',
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
  handleemailValue=(event)=>{
    this.setState({emailValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/email', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:this.state.emailValue,
        company:this.state.companyValue,
        contact:this.state.contactValue
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Email ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})
    } )
    };



  render() {
    const { classes } = this.props;

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
                  Create Email 
                </Typography>
                <form  onSubmit={this.handleSubmit} >
                  <Grid item >
                    <TextField
                    id="outlined-uncontrolled"
                    label="E-mail"
                    type="email"
                    // placeholder="E-mail "
                    margin="normal"
                    onChange={this.handleemailValue}
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

</div>

      )



}
      }

export default  withStyles(useStyles)(CreateContact);