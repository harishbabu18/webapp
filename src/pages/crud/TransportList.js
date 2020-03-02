import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../../config';
import { Button } from '@material-ui/core';
import { ButtonGroup} from '@material-ui/core';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        display:'Center',

    },
    [theme.breakpoints.up('md')]: {
        width:'100%',
        justify:"center",
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,
        display:'Center',

    },

    },
  },
  title: {
    fontSize: 18,
  },
  table: {
    minWidth: 700,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1,0),
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
          <div>
         
          <Grid item  sm={6} md={12} className={classes.root} >

            <ButtonGroup fullWidth aria-label="full width outlined button group">
              <Button className={classes.content} href="/warehouse/transport/list">List Transport</Button>
              <Button className={classes.content} href="/warehouse/transport/create">Create Transport</Button>
            </ButtonGroup>
            </Grid>
         

          <Grid item  sm={12} md={12} className={classes.content} >


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
    </Grid>
    </div>
        );
      }

    }
export default  withStyles(useStyles)(Transport);