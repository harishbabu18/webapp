import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width:360 ,
    },
      [theme.breakpoints.up('lg')]: {
        width: 420,
    },

    },
  },
  title: {
    fontSize: 18,
  },

});


class CreateTicket extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      submitStatus:'',
      descriptionValue:'',
      ticketStatusType: [],
      ticketStatusTypeValue: '',
      ticketSource:[],
      ticketSourceValue: '',
      company:[],
      companyValue: '',
      employee:[],
      employeeValue:'',
      contact:[],
      contactValue:'',
      updatedValue:'Status',
    }
  }
  componentDidMount() {
    fetch(SERVER_URL+'/ticketStatusType')
    .then(r => r.json())
    .then(json => this.setState({ticketStatusType: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/ticketSource')
    .then(r => r.json())
    .then(json => this.setState({ticketSource: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/company')
    .then(r => r.json())
    .then(json => this.setState({company: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));

    fetch(SERVER_URL+'/employee')
    .then(r => r.json())
    .then(json => this.setState({employee: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
   
    fetch(SERVER_URL+'/contact')
    .then(r => r.json())
    .then(json => this.setState({contact: json}))
    .catch(error => console.error('Error retrieving Tickrts: ' + error));
  }

  handleChange=(event)=>{
    this.setState({descriptionValue:event.target.value});
  }

  handleChangeticketStatusTypeValue(event){
    this.setState({ticketStatusTypeValue:event.target.value});

  }

  handleChangeticketSourceValue(event){
    this.setState({ticketSourceValue:event.target.value});

  }

  handleChangeCompanyValue(event){
    this.setState({companyValue:event.target.value});
    
  }

  handleemployeeeValue(event){
    this.setState({employeeValue:event.target.value});

  }

  handlecontactValue(event){
    this.setState({contactValue:event.target.value});

  }


  handleSubmit=(event)=>{
    event.preventDefault()
    fetch(SERVER_URL+'/ticket', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description:this.state.descriptionValue,
        urgent:false,
        import:false,
        ticketSource:this.state.ticketSourceValue,
        ticketStatus:this.state.ticketStatusTypeValue,
        createdBy:this.state.employeeValue,
        assignedTo:this.state.employeeValue,
        company:this.state.companyValue,
        contact:this.state.contactValue
      })
    }).then(r=> r.json()).then(json =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "Ticket ID " +json.id+" is Added Successfully"
    this.setState({updatedValue})
    }).catch(error =>{
      let updatedValue = this.state.updatedValue;
      updatedValue = "The Error is " +error.message;
    this.setState({updatedValue})

    } )
    };

  render() {
    const { classes } = this.props;

  return (
    <div>

        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" variant="h2" component="h1" gutterBottom>
                    Create Ticket Profile
                </Typography>

                <form  onSubmit={this.handleSubmit} >
                    <Grid item >
                        <TextField
                        id="outlined-uncontrolled"
                        label="Description"
                        placeholder="Description "
                        margin="normal"
                        onChange={this.handleChange}
                    
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
                        label="Ticket Source"
                        value={this.state.ticketSourceValue}
                        onChange={this.handleChangeticketSourceValue.bind(this)}
                        variant="outlined"
                        >
                            {this.state.ticketSource.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Ticket Status"
                        value={this.state.ticketStatusTypeValue}
                        onChange={this.handleChangeticketStatusTypeValue.bind(this)}
                        variant="outlined"
                        >
                            {this.state.ticketStatusType.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                        id="demo-simple-select-outlined-label"
                        select 
                        label="Assigned To"
                        value={this.state.employeeValue}
                        onChange={this.handleemployeeeValue.bind(this)}
                        variant="outlined"
                        >
                            {this.state.employee.map(option =>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.firstName}
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
  );
}}

export default  withStyles(useStyles)(CreateTicket);