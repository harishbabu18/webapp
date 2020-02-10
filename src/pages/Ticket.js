import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {SERVER_URL} from '../config';

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

class Ticket extends React.Component {
    constructor() {
        super();
    
        this.state = {
          ticket: []
        }
      }
      componentDidMount() {
        fetch(SERVER_URL+'/ticket')
        .then(r => r.json())
        .then(json => this.setState({ticket: json}))
        .catch(error => console.error('Error retrieving Companies: ' + error));
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
            <Paper className={classes.root}>
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
      </Table>
    </Paper>
        );
    }
}

export default  withStyles(useStyles)(Ticket);