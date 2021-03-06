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
import { ButtonGroup} from '@material-ui/core';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root ': {
      margin: theme.spacing(1),
      marginBottom: 12,
      flexGrow:1,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width:'100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: 305,

    },

    },
  },
  title: {
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1,0),
  },



})


class Service extends React.Component {
 
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
          service: [],
          filterList:[],
        
        }
      
      // this.handleChange = this.handleChange.bind(this);
    }
      componentDidMount() {
        this.loadTask()
       }
       loadTask = () => {
         const {offset,max,service} = this.state
        const url = SERVER_URL+'/services?offset='+offset+'&max='+max
        //const url = SERVER_URL+'/ticket'
         fetch(url)
         .then(r => r.json())
         .then(json => this.setState({service:[...service,...json] }))
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
          
          
          

          function renderServiceRow(services) {

            return (<StyledTableRow key={services.id}>
              <StyledTableCell component="th" scope="row">
                {services.id}
              </StyledTableCell>
            
              <StyledTableCell align="right">{services.name}</StyledTableCell>
              <StyledTableCell align="right">{services.price}</StyledTableCell>
              <StyledTableCell align="right">{services.description}</StyledTableCell>
              <StyledTableCell align="right">{services.deadline}</StyledTableCell>
              <StyledTableCell align="right">{services.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{services.lastUpdated}</StyledTableCell>
            </StyledTableRow>);
          }
      

        return(
            <div>
            <Grid item  sm={6} md={12} className={classes.root} >
  
            <ButtonGroup fullWidth aria-label="full width outlined button group">
            <Button href="/service/list">List Services</Button>
            <Button href="/service/create">Create Services</Button>
            
          </ButtonGroup>
          </Grid>
  
          <Grid item  sm={12} md={12} className={classes.content} >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Service Name</StyledTableCell>
            <StyledTableCell align="right"> Price</StyledTableCell>
            <StyledTableCell align="right">Technical Specification</StyledTableCell>
            <StyledTableCell align="right">Deadline </StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Last Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.service.map(renderServiceRow)}
        </TableBody>
      </Table>

      <Button onClick={this.loadMore}>Load More</Button>
    </Grid>
    </div>
        );
    }
}

export default  withStyles(useStyles)(Service);