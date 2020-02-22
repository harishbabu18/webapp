import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {SERVER_URL} from '../config';
import { Button } from '@material-ui/core';
const useStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
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
          offset:0,
          max:10,
          task: [],
          filterList:[],
          searchTaskValue:'',
        }
      
      // this.handleChange = this.handleChange.bind(this);
    }
      componentDidMount() {
        this.loadTask()
       }
       loadTask = () => {
         const {offset,max,task} = this.state
        const url = SERVER_URL+'/task?offset='+offset+'&max='+max
        //const url = SERVER_URL+'/ticket'
         fetch(url)
         .then(r => r.json())
         .then(json => this.setState({task:[...task,...json] }))
         .catch(error => console.error('Error retrieving Companies: ' + error));
       }
      loadMore=()=>{
        this.setState(prevState =>({
          offset:prevState.offset+10
        }),this.loadTask)     
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
              <StyledTableCell component="th" scope="row">
                Ticket-{task.ticket}
              </StyledTableCell>
              <StyledTableCell align="right">{task.personalNote}</StyledTableCell>
              <StyledTableCell align="right">{task.publicMessage}</StyledTableCell>
              <StyledTableCell align="right">{task.assignedTo}</StyledTableCell>
              <StyledTableCell align="right">{task.assignedBy}</StyledTableCell>
              <StyledTableCell align="right">{task.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{task.lastUpdated}</StyledTableCell>
            </StyledTableRow>);
          }
      

        return(
          <Grid container component="main" className={classes.root}>
         
          <Grid item  sm={12} md={12}  component={Paper} elevation={6} square>
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Task</StyledTableCell>
            <StyledTableCell align="right">Ticket Id</StyledTableCell>
            <StyledTableCell align="right">Personal Note</StyledTableCell>
            <StyledTableCell align="right">Public Message</StyledTableCell>
            <StyledTableCell align="right">Assigned to</StyledTableCell>
            <StyledTableCell align="right">Assigned By</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Last Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.task.map(renderTaskRow)}
        </TableBody>
      </Table>

      <Button onClick={this.loadMore}>Load More</Button>
    </Paper>
    </Grid>
    </Grid>
        );
    }
}

export default  withStyles(useStyles)(Task);