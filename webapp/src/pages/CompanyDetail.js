import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateCompany from './CreateCompany';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';
import { Button } from '@material-ui/core';
import { ButtonGroup} from '@material-ui/core';
import { Link } from "react-router-dom";



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

class CompanyDetail extends React.Component {
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
          company: [],
          filterList:[],
          searchTicketValue:'',
          user:[],
          
        }
     

      }
      // componentDidMount () {
      //   const { handle } = this.props.params
    
      //   fetch(SERVER_URL+'/company/profile/id:'+{handle})
      //     .then((user) => {
      //       this.setState(() => ({ user }))
      //       console.log(this.state)
      //     })}


      
    //   componentDidMount() {
    //    this.loadCompany()
    //   }
    //   loadCompany= () => {
    //     const {offset,max,company} = this.state
    //    const url = SERVER_URL+'/company?offset='+offset+'&max='+max
      
    //     fetch(url)
    //     .then(r => r.json())
    //     .then(json => this.setState({company:[...company,...json] }))
    //     .catch(error => console.error('Error retrieving Companies: ' + error));
    //   }

    //   loadMore=()=>{
    //     this.setState(prevState =>({
    //       offset:prevState.offset+10
    //     }),this.loadCompany)     
    //   }


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
          
          
          

        //   function renderCompanyRow(Company) {

        //     return (<StyledTableRow key={Company.id}>
        //       <StyledTableCell component="th" scope="row">
        //       {/* <a href="/admin/company/list"> {Company.name} </a> */}
        //       <Link to={{ pathname: '/', state: { id: Company.id} }}>{Company.name}</Link>
        //       </StyledTableCell>
        //     </StyledTableRow>);
        //   }
      

        return(
          <Grid container component="main" className={classes.root}>
         
          <Grid item  sm={12} md={12}  component={Paper} elevation={6} square>



          <Paper square>
          <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button href="/admin/company/list">General Info</Button>
          <Button href="/admin/company/create">Activity</Button>
          
          <Button href="/admin/company/list">Ticket</Button>
          <Button href="/admin/company/create">Oppertunity</Button>
          <Button href="/admin/company/list">Offer</Button>
          <Button href="/admin/company/create">Subscription</Button>
          <Button href="/admin/company/list">Odders</Button>
          <Button href="/admin/company/create">Acounting</Button>

        </ButtonGroup>
          </Paper>
            {/* <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell > name </StyledTableCell>
         
          

          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.company.map(renderCompanyRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Paper> */}
    </Grid>
    </Grid>
        );
    }
}

export default  withStyles(useStyles)(CompanyDetail);