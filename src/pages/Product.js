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
import { Button ,ButtonGroup} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Barcode from 'react-barcode';


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


class Product extends React.Component {
 
    constructor() {
        super();
    
        this.state = {
          offset:0,
          max:10,
          product: [],
          filterList:[],
       
        }
  
    }
      componentDidMount() {
       

       this.loadProduct()
       }

       shouldComponentRender() {
        // const {pending} = this.props;
        if(this.pending === false) return false;
        // more tests
        return true;
    }




       loadProduct = () => {
         const {offset,max,product} = this.state
        const url = SERVER_URL+'/inventory?offset='+offset+'&max='+max

         fetch(url)
         .then(r => r.json())
         .then(json => this.setState({product:[...product,...json] }))
         .catch(error => console.error('Error retrieving Companies: ' + error));

  
       }
      loadMore=()=>{
        this.setState(prevState =>({
          offset:prevState.offset+10
        }),this.loadProduct)     
      }

    render() {
        const { classes,products } = this.props;
      
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
          
          
          

          function renderProductRow(product) {

            return (<StyledTableRow key={product.id}>
              <StyledTableCell component="th" scope="row">
                {product.id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {product.name}
              </StyledTableCell>
              <StyledTableCell align="right"><Barcode value={product.barcode}/></StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
              <StyledTableCell align="right">{product.quantity} {product.quantityType}</StyledTableCell>
              <StyledTableCell align="right">{product.number} </StyledTableCell>
              <StyledTableCell align="right">{product.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{product.lastUpate}</StyledTableCell>
              <StyledTableCell align="right">{product.createBy}</StyledTableCell>
              <StyledTableCell align="right">{product.address}</StyledTableCell>

            </StyledTableRow>);
          }
      
          if(!this.shouldComponentRender()) return <LinearProgress />


        return(
          <div>
          <Grid item  sm={6} md={12} className={classes.root} >

          <ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button href="/warehouse/product/list">List Products</Button>
          <Button href="/warehouse/product/create">Create Products</Button>
          
        </ButtonGroup>
        </Grid>

        <Grid item  sm={12} md={12} className={classes.content} >


      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Id</StyledTableCell>
            <StyledTableCell align="right">Product Name</StyledTableCell>
            <StyledTableCell align="right">Barcode</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Number of Item</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Last Updated</StyledTableCell>
            <StyledTableCell align="right">Created by</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
            <renderProductRow product={products}/>
        {this.state.product.map(renderProductRow)}
        </TableBody>
        <Button onClick={this.loadMore}>Load More</Button>
      </Table>
    </Grid>
    </div>
        );
    }
}




export default withStyles(useStyles)(Product);