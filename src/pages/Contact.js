import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';
import { Button } from '@material-ui/core';
import CreateContact from './CreateContact';


const useStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Contact extends React.Component {
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
           contact: [],
          filterList:[],
          searchContactValue:'',
          
        }
    

      }
      componentDidMount() {
       this.loadContacts()
      }
      loadContacts = () => {
        const {offset,max,contact} = this.state
       const url = SERVER_URL+'/contact?offset='+offset+'&max='+max
       //const url = SERVER_URL+'/ticket'
        fetch(url)
        .then(r => r.json())
        .then(json => this.setState({contact:[...contact,...json] }))
        .catch(error => console.error('Error retrieving Contacts: ' + error));
      }

      loadMore=()=>{
        this.setState(prevState =>({
          offset:prevState.offset+10
        }),this.loadContacts)     
      }

    render() {
        const { classes } = this.props;
        const StyledTableCell = withStyles(theme => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles(theme => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
              },
            },
          }))(TableRow);
          
          
          

          function renderContactRow(Contact) {

            return (<StyledTableRow key={Contact.id}>
              <StyledTableCell component="th" scope="row">
                {Contact.company}
              </StyledTableCell>
              <StyledTableCell align="right">{Contact.firstName}</StyledTableCell>
              <StyledTableCell align="right">{Contact.lastName}</StyledTableCell>
              <StyledTableCell align="right">{Contact.position}</StyledTableCell>
              <StyledTableCell align="right">{Contact.note}</StyledTableCell>
              <StyledTableCell align="right">{Contact.dob}</StyledTableCell>
              
            </StyledTableRow>);
          }
      

        return(
          <Grid container component="main" className={classes.root}>
             <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
            <CreateContact />
          </Grid>
         
          <Grid item  sm={12} md={8}  component={Paper} elevation={6} square>
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"> Company Name </StyledTableCell>
            <StyledTableCell align="right"> First Name</StyledTableCell>
            <StyledTableCell align="right"> Last Name </StyledTableCell>
            <StyledTableCell align="right"> Position </StyledTableCell>
            <StyledTableCell align="right"> Note </StyledTableCell>
            <StyledTableCell align="right"> Dob </StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.contact.map(renderContactRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Paper>
    </Grid>
    </Grid>
        );
    }
}

export default  withStyles(useStyles)(Contact);