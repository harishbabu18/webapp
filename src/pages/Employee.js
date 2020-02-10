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

class Employee extends React.Component {
    constructor() {
        super();
    
        this.state = {
          companies: []
        }
      }
      componentDidMount() {
        fetch(SERVER_URL+'/company')
        .then(r => r.json())
        .then(json => this.setState({companies: json}))
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
          
          
          

          function renderEmployeeRow(Employee) {

            return (<StyledTableRow key={Employee.id}>
              <StyledTableCell component="th" scope="row">
                {Employee.name}
              </StyledTableCell>
              <StyledTableCell align="right">{Employee.description}</StyledTableCell>
              <StyledTableCell align="right">{Employee.address}</StyledTableCell>
              <StyledTableCell align="right">{Employee.website}</StyledTableCell>
            </StyledTableRow>);
          }
      

        return(
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email Id</StyledTableCell>
            <StyledTableCell align="right">Date Of Birth </StyledTableCell>
            <StyledTableCell align="right">Joining Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.companies.map(renderEmployeeRow)}
        </TableBody>
      </Table>
    </Paper>
        );
    }
}

export default  withStyles(useStyles)(Employee);