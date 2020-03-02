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
    width: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Opportunity extends React.Component {
 
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
          opportunity: [],
          filterList:[],
        
        }
      
      // this.handleChange = this.handleChange.bind(this);
    }
      componentDidMount() {
        this.loadTask()
       }
       loadTask = () => {
         const {offset,max,opportunity} = this.state
        const url = SERVER_URL+'/company?offset='+offset+'&max='+max
        //const url = SERVER_URL+'/ticket'
         fetch(url)
         .then(r => r.json())
         .then(json => this.setState({opportunity:[...opportunity,...json] }))
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
          
          
          

          function renderOpprtunityRow(opportunity) {

            return (<StyledTableRow key={opportunity.id}>
             <StyledTableCell align="left">{opportunity.name}</StyledTableCell>
             {/* <StyledTableCell align="right">{opportunity.client}</StyledTableCell>
             <StyledTableCell align="right">{opportunity.contact}</StyledTableCell>
             <StyledTableCell align="right">{opportunity.owner}</StyledTableCell>
             <StyledTableCell align="right">{opportunity.startingdate}</StyledTableCell>
             <StyledTableCell align="right">{opportunity.closingdate}</StyledTableCell>
             <StyledTableCell align="right">{opportunity.source}</StyledTableCell>
             <StyledTableCell align="right">{opportunity.service}</StyledTableCell> */}
              
            </StyledTableRow>);
          }
      

        return(
            <div>
            <Grid item  sm={6} md={12} className={classes.root} >
  
            <ButtonGroup fullWidth aria-label="full width outlined button group">
            <Button href="/commercial/opportunity/list">List Opportunity</Button>
            <Button href="/commercial/opportunity/create">Create Opportunity</Button>
            
          </ButtonGroup>
          </Grid>
  
          <Grid item  sm={12} md={12} className={classes.content} >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Opportunity Description</StyledTableCell>
            <StyledTableCell align="right">Client</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Owner</StyledTableCell>
            <StyledTableCell align="right">Starting Date</StyledTableCell>
            <StyledTableCell align="right">Closing Date</StyledTableCell>
            <StyledTableCell align="right">Source</StyledTableCell>
            <StyledTableCell align="right">Services</StyledTableCell>
            
            
            
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.opportunity.map(renderOpprtunityRow)}
        </TableBody>
      </Table>

      <Button onClick={this.loadMore}>Load More</Button>
    </Grid>
    </div>
        );
    }
}

export default  withStyles(useStyles)(Opportunity);