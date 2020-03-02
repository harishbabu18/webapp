import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../../config';
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
  
  class Transport extends React.Component {
      constructor() {
          super();
      
          this.state = {
            offset:0,
            max:10,
            transport: [],
            filterList:[],
            searchTicketValue:'',
            
          }
        }

        componentDidMount() {
            this.loadTransport()
           }
           loadTransport = () => {
             const {offset,max,transport} = this.state
            const url = SERVER_URL+'/transport?offset='+offset+'&max='+max
           
             fetch(url)
             .then(r => r.json())
             .then(json => this.setState({transport:[...transport,...json] }))
             .catch(error => console.error('Error retrieving transport: ' + error));
           }
     
           loadMore=()=>{
             this.setState(prevState =>({
               offset:prevState.offset+10
             }),this.loadTransport)     
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
          
          
          

          function renderTransportRow(Transport) {

            return (<StyledTableRow key={Transport.id}>
              <StyledTableCell component="th" scope="row">
               {Transport.loading}</StyledTableCell>
              <StyledTableCell align="right">{Transport.unloading}</StyledTableCell>
              <StyledTableCell align="right">{Transport.schedule}</StyledTableCell>
               </StyledTableRow>
            );
          }
      

        return(
          <Grid container component="main" className={classes.root}>
         
          <Grid item  sm={12} md={12}  component={Paper} elevation={6} square>
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Loading Transport</StyledTableCell>
            <StyledTableCell align="right"> Unloading Transport </StyledTableCell>
            <StyledTableCell align="right"> Scheduled Transport</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.transport.map(renderTransportRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Paper>
    </Grid>
    </Grid>
        );
      }

    }
export default  withStyles(useStyles)(Transport);