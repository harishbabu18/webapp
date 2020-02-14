import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreatePhone from '../crud/CreatePhone';
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
  
  class Phone extends React.Component {
      constructor() {
          super();
      
          this.state = {
            offset:0,
            max:10,
            phone: [],
            filterList:[],
            searchTicketValue:'',
            
          }
        }

        componentDidMount() {
            this.loadPhone()
           }
           loadPhone = () => {
             const {offset,max,phone} = this.state
            const url = SERVER_URL+'/phone?offset='+offset+'&max='+max
           
             fetch(url)
             .then(r => r.json())
             .then(json => this.setState({phone:[...phone,...json] }))
             .catch(error => console.error('Error retrieving Companies: ' + error));
           }
     
           loadMore=()=>{
             this.setState(prevState =>({
               offset:prevState.offset+10
             }),this.loadPhone)     
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
          
          
          

          function renderPhoneRow(Phone) {

            return (<StyledTableRow key={Phone.id}>
              <StyledTableCell component="th" scope="row">
               {Phone.phone}</StyledTableCell>
              {/* <StyledTableCell align="right">{Email.company.id}</StyledTableCell> */}
              {/* <StyledTableCell align="right">{Email.contact.id}</StyledTableCell> */}
               </StyledTableRow>
            );
          }
      

        return(
          <Grid container component="main" className={classes.root}>
          <Grid item  sm={12} md={4}  component={Paper} elevation={6} square>
            <CreatePhone />
          </Grid>
          <Grid item  sm={12} md={8}  component={Paper} elevation={6} square>
            <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Phone</StyledTableCell>
            {/* <StyledTableCell align="right"> Company </StyledTableCell>
            <StyledTableCell align="right"> Contact</StyledTableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.phone.map(renderPhoneRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Paper>
    </Grid>
    </Grid>
        );
      }

    }
export default  withStyles(useStyles)(Phone);