import React from 'react';
import {SERVER_URL} from '../config';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CreateEmployee from './CreateEmployee';
import Grid from '@material-ui/core/Grid';



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
    
        // this.state = {
        //   companies: []
        // }

        // componentDidMount() {
        //   fetch(SERVER_URL+'/employee')
        //   .then(r => r.json())
        //   .then(json => this.setState({companies: json}))
        //   .catch(error => console.error('Error retrieving Companies: ' + error));
        // }
      

      this.state = {
        offset:0,
        max:10,
        employee: [],
        filterList:[],
        searchTicketValue:'',
        
      }
      // this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
     this.loadEmployees()
    }
    loadEmployees = () => {
      const {offset,max,employee} = this.state
     const url = SERVER_URL+'/employee?offset='+offset+'&max='+max
     //const url = SERVER_URL+'/ticket'
      fetch(url)
      .then(r => r.json())
      .then(json => this.setState({employee:[...employee,...json] }))
      .catch(error => console.error('Error retrieving Companies: ' + error));
    }

    loadMore=()=>{
      this.setState(prevState =>({
        offset:prevState.offset+10
      }),this.loadEmployees)     
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
                {Employee.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{Employee.lastName}</StyledTableCell>
              <StyledTableCell align="right">{Employee.email}</StyledTableCell>
              <StyledTableCell align="right">{Employee.dob}</StyledTableCell>
              <StyledTableCell align="right">{Employee.joinindate}</StyledTableCell>
            </StyledTableRow>);
          }
      

        return(
          <Grid container component="main" className={classes.root}>
          <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
            <CreateEmployee />
          </Grid>
          <Grid item  sm={12} md={8}  component={Paper} elevation={6} square>
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
        {this.state.employee.map(renderEmployeeRow)}
        </TableBody>
        <Button onClick={this.loadMore}>Load More</Button>
      </Table>
    </Paper>
    </Grid>
    </Grid>


        );
    }
}

export default  withStyles(useStyles)(Employee);