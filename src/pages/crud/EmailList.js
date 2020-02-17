import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateEmail from '../crud/CreateEmail';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../../config';
import { Button } from '@material-ui/core';


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
  
  class Email extends React.Component {
      constructor() {
          super();
      
          this.state = {
            offset:0,
            max:10,
            email: [],
            filterList:[],
            searchTicketValue:'',
            
          }
        }

        componentDidMount() {
            this.loadEmail()
           }
           loadEmail = () => {
             const {offset,max,email} = this.state
            const url = SERVER_URL+'/email?offset='+offset+'&max='+max
           
             fetch(url)
             .then(r => r.json())
             .then(json => this.setState({email:[...email,...json] }))
             .catch(error => console.error('Error retrieving Companies: ' + error));
           }
     
           loadMore=()=>{
             this.setState(prevState =>({
               offset:prevState.offset+10
             }),this.loadEmail)     
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
          
          
          

          function renderEmailRow(Email) {

            return (<StyledTableRow key={Email.id}>
              <StyledTableCell component="th" scope="row">
               {Email.email}</StyledTableCell>
              {/* <StyledTableCell align="right">{Email.company.id}</StyledTableCell> */}
              {/* <StyledTableCell align="right">{Email.contact.id}</StyledTableCell> */}
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
            <StyledTableCell>Email</StyledTableCell>
            {/* <StyledTableCell align="right"> Company </StyledTableCell>
            <StyledTableCell align="right"> Contact</StyledTableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.email.map(renderEmailRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Paper>
    </Grid>
    </Grid>
        );
      }

    }
export default  withStyles(useStyles)(Email);