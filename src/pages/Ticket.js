import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateTicket from './CreateTicket';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';
import { Button } from '@material-ui/core';
import { ButtonGroup} from '@material-ui/core';



const useStyles = theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,
      flexGrow:1,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width:'100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,

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



})

class Ticket extends React.Component {
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
          ticket: [],
          filterList:[],
          searchTicketValue:'',
          
        }
     

      }
      componentDidMount() {
       this.loadTickets()
      }
      loadTickets = () => {
        const {offset,max,ticket} = this.state
       const url = SERVER_URL+'/ticket?offset='+offset+'&max='+max
      
        fetch(url)
        .then(r => r.json())
        .then(json => this.setState({ticket:[...ticket,...json] }))
        .catch(error => console.error('Error retrieving Companies: ' + error));
      }

      loadMore=()=>{
        this.setState(prevState =>({
          offset:prevState.offset+10
        }),this.loadTickets)     
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
          
          
          

          function renderTicketRow(Ticket) {

            return (<StyledTableRow key={Ticket.id}>
              <StyledTableCell component="th" scope="row">
                {Ticket.ticket}
              </StyledTableCell>
              <StyledTableCell align="right">{Ticket.description}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.contact}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.ticketStatus}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.ticketSource}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.createdBy}</StyledTableCell>
              <StyledTableCell align="right">{Ticket.assignedTo}</StyledTableCell>

            </StyledTableRow>);
          }
      

        return(
          <div>
          <Grid item  sm={6} md={12} className={classes.root} >

          <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button href="/sales/ticket/list">List Ticket</Button>
          <Button href="/sales/ticket/create">Create Ticket</Button>
          
        </ButtonGroup>
        </Grid>

        <Grid item  sm={12} md={12} className={classes.content} >

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ticket ID</StyledTableCell>
            <StyledTableCell align="right"> Description </StyledTableCell>
            <StyledTableCell align="right"> Contact</StyledTableCell>
            <StyledTableCell align="right"> Status </StyledTableCell>
            <StyledTableCell align="right"> Sources </StyledTableCell>
            <StyledTableCell align="right"> Created By </StyledTableCell>
            <StyledTableCell align="right"> Assigned To </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.ticket.map(renderTicketRow)}
        </TableBody>
        <Button onClick={this.loadMore}>Load More</Button>
      </Table>
    </Grid>
    </div>
        );
    }
}

export default  withStyles(useStyles)(Ticket);