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
  
  class User extends React.Component {
     
    constructor() {
          super();
      
          this.state = {
            users: []
          }
        }

        componentDidMount() {
          fetch(SERVER_URL+'/user')
          .then(r => r.json())
          .then(json => this.setState({users: json}))
          .catch(error => console.error('Error retrieving users: ' + error));
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
          
          
          

          function renderUserRow(user) {

            return (<StyledTableRow key={user.id}>
                    
<StyledTableCell component="th" scope="row">{user.username}</StyledTableCell>
<StyledTableCell align="right">{user.firstName}</StyledTableCell>
<StyledTableCell align="right">{user.middleName}</StyledTableCell>
<StyledTableCell align="right">{user.lastName}</StyledTableCell>
<StyledTableCell align="right">{user.mobile}</StyledTableCell>

                   </StyledTableRow>);
          }


        return(<Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          
<StyledTableCell>USERNAME</StyledTableCell>
<StyledTableCell align="right">FIRSTNAME</StyledTableCell>
<StyledTableCell align="right">MIDDLENAME</StyledTableCell>
<StyledTableCell align="right">LASTNAME</StyledTableCell>
<StyledTableCell align="right">MOBILE</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.users.map(renderUserRow)}
        </TableBody>
      </Table>
    </Paper>);
      }
  }
  
  export default  withStyles(useStyles)(User);