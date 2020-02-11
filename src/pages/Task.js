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

class Task extends React.Component {
    constructor() {
        super();
    
        this.state = {
          task: []
        }
      }
      componentDidMount() {
        fetch(SERVER_URL+'/task')
        .then(r => r.json())
        .then(json => this.setState({task: json}))
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
          
          
          

          function renderTaskRow(task) {

            return (<StyledTableRow key={task.id}>
              <StyledTableCell component="th" scope="row">
                {task.id}
              </StyledTableCell>
              <StyledTableCell align="right">{task.assignedTo}</StyledTableCell>
              <StyledTableCell align="right">{task.assignedBy}</StyledTableCell>
              <StyledTableCell align="right">{task.personalNote}</StyledTableCell>
              <StyledTableCell align="right">{task.personalMessage}</StyledTableCell>
              <StyledTableCell align="right">{task.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{task.lastUpdated}</StyledTableCell>
            </StyledTableRow>);
          }
      

        return(
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Task</StyledTableCell>
            <StyledTableCell align="right">Ticket Id</StyledTableCell>
            <StyledTableCell align="right">Assigned to</StyledTableCell>
            <StyledTableCell align="right">Assigned By</StyledTableCell>
            <StyledTableCell align="right">Personal Note</StyledTableCell>
            <StyledTableCell align="right">Public Message</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Last Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.task.map(renderTaskRow)}
        </TableBody>
      </Table>
    </Paper>
        );
    }
}

export default  withStyles(useStyles)(Task);