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

class Contact extends React.Component {
    constructor() {
        super();
    
        this.state = {
          contacts: []
        }
      }
      componentDidMount() {
        fetch(SERVER_URL+'/contact')
        .then(r => r.json())
        .then(json => this.setState({contacts: json}))
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
          
          
          

          function renderCompanyRow(contacts) {

            return (<StyledTableRow key={contacts.id}>
              <StyledTableCell component="th" scope="row">
                {contacts.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{contacts.lastName}</StyledTableCell>
              <StyledTableCell align="right">{contacts.dob}</StyledTableCell>
              {/* <StyledTableCell align="right">{contacts.website}</StyledTableCell>
              <StyledTableCell align="right">{contacts.mobile}</StyledTableCell> */}
            </StyledTableRow>);
          }
      

        return(
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Date of Birth</StyledTableCell>
            <StyledTableCell align="right">E-mail</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Fax</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.contacts.map(renderCompanyRow)}
        </TableBody>
      </Table>
    </Paper>
        );
    }
}

export default  withStyles(useStyles)(Contact);