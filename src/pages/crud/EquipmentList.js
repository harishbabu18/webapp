import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {SERVER_URL} from '../config';
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
class Equipment extends React.Component {
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
           equipment: [],
          filterList:[],
          searchContactValue:'',
          
        }
    

      }
      componentDidMount() {
       this.loadContacts()
      }
      loadContacts = () => {
        const {offset,max,equipment} = this.state
       const url = SERVER_URL+'/equipment?offset='+offset+'&max='+max
        fetch(url)
        .then(r => r.json())
        .then(json => this.setState({equipment:[...equipment,...json] }))
        .catch(error => console.error('Error retrieving Equipment: ' + error));
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
          
          
          

          function renderEquipmentRow(equipment) {

            return (<StyledTableRow key={equipment.id}>
              <StyledTableCell component="th" scope="row">
                {equipment.name}
              </StyledTableCell>
              <StyledTableCell align="right">{equipment.description}</StyledTableCell>
              <StyledTableCell align="right">{equipment.type}</StyledTableCell>
              <StyledTableCell align="right">{ equipment.serial}</StyledTableCell>
              <StyledTableCell align="right">{equipment.supplier}</StyledTableCell>
              <StyledTableCell align="right">{equipment.salesPrice}</StyledTableCell>
              <StyledTableCell align="right">{equipment.purchasePrice}</StyledTableCell>

              
            </StyledTableRow>);
          }
      

        return(
          <div>
         
          <Grid item  sm={6} md={12} className={classes.root} >

            <ButtonGroup fullWidth aria-label="full width outlined button group">
              <Button className={classes.content} href="/warehouse/equipment/list">List Equipment</Button>
              <Button className={classes.content} href="/warehouse/equipment/create">Create Equipment</Button>
            </ButtonGroup>
            </Grid>
         

          <Grid item  sm={12} md={12} className={classes.content} >


      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"> Name </StyledTableCell>
            <StyledTableCell align="right"> Description </StyledTableCell>
            <StyledTableCell align="right">  Serial Number </StyledTableCell>
            <StyledTableCell align="right">  Type </StyledTableCell>
            <StyledTableCell align="right"> Supplier </StyledTableCell>
            <StyledTableCell align="right"> Sales Price </StyledTableCell>
            <StyledTableCell align="right"> Purchase Price </StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.equipment.map(renderEquipmentRow)}
        </TableBody>
      </Table>
      <Button onClick={this.loadMore}>Load More</Button>
    </Grid>
    </div>
        );
    }
}

export default  withStyles(useStyles)(Equipment);