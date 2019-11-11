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
  
  class Role extends React.Component {
     
    constructor() {
          super();
      
          this.state = {
            roles: []
          }
        }

        componentDidMount() {
          fetch(SERVER_URL+'/role')
          .then(r => r.json())
          .then(json => this.setState({roles: json}))
          .catch(error => console.error('Error retrieving roles: ' + error));
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
          
          
          

          function renderRoleRow(role) {

            return (<StyledTableRow key={role.id}>
                    <StyledTableCell component="th" scope="row">{role.authority}</StyledTableCell>
<StyledTableCell align="right">{role.authority}</StyledTableCell>

                   </StyledTableRow>);
          }


        return(<Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>AUTHORITY</StyledTableCell>
<StyledTableCell align="right">authority</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.roles.map(renderRoleRow)}
        </TableBody>
      </Table>
    </Paper>);
      }
  }
  
  export default  withStyles(useStyles)(Role);