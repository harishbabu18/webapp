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
class ProviderList extends React.Component {
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
           offer: [],
          filterList:[],
          searchContactValue:'',
          
        }
    

      }
      componentDidMount() {
       this.loadContacts()
      }
      loadContacts = () => {
        const {offset,max,offer} = this.state
       const url = SERVER_URL+'/company?offset='+offset+'&max='+max
        fetch(url)
        .then(r => r.json())
        .then(json => this.setState({offer:[...offer,...json] }))
        .catch(error => console.error('Error retrieving Offer: ' + error));
      }

      loadMore=()=>{
        this.setState(prevState =>({
          offset:prevState.offset+10
        }),this.loadContacts)     
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
          
          
          

          function renderProviderRow(offer) {

            return (<StyledTableRow key={offer.id}>
              <StyledTableCell component="th" scope="row">
                {/* {offer.protocol} */}
                {offer.name}

              </StyledTableCell>
              {/* <StyledTableCell align="right">{offer.customer}</StyledTableCell>
              <StyledTableCell align="right">{offer.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{ offer.deadline}</StyledTableCell>
              <StyledTableCell align="right">{offer.service}</StyledTableCell>
              <StyledTableCell align="right">{offer.totalPrice}</StyledTableCell>
              <StyledTableCell align="right">{offer.reference}</StyledTableCell>
              <StyledTableCell align="right">{offer.commission}</StyledTableCell> */}


              
            </StyledTableRow>);
          }
      

        return(
          <div>
         
          <Grid item  sm={6} md={12} className={classes.root} >

            <ButtonGroup fullWidth aria-label="full width outlined button group">
              <Button className={classes.content} href="/addressbook/provider/list">List Provider</Button>
              <Button className={classes.content} href="/addressbook/provider/create">Create Provider</Button>
            </ButtonGroup>
            </Grid>
         

          <Grid item  sm={12} md={12} className={classes.content} >


      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"> Supplier </StyledTableCell>
            <StyledTableCell align="right"> Vat Number </StyledTableCell>
            <StyledTableCell align="right">  Fax </StyledTableCell>
            <StyledTableCell align="right">  Address  </StyledTableCell>
            <StyledTableCell align="right"> Qualification </StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.offer.map(renderProviderRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Grid>
    </div>
        );
    }
}

export default  withStyles(useStyles)(ProviderList);