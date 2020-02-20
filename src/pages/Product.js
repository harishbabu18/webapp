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
import CreateTask from './CreateTask';
import {productController} from './ProductController';
import {getProductsError, getProducts, getProductsPending} from "./../reducers/product";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from './../action/index';



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
        this.props.dispatch(productController());

       // this.loadProduct()
       }

       shouldComponentRender() {
        const {pending} = this.props;
        if(this.pending === false) return false;
        // more tests
        return true;
    }




       loadProduct = () => {
         const {offset,max,product} = this.state
        const url = SERVER_URL+'/inventory?offset='+offset+'&max='+max

         fetch(url)
        //  .then(r => r.json())
        //  .then(json => this.setState({product:[...product,...json] }))
        //  .catch(error => console.error('Error retrieving Companies: ' + error));

        // .then(r => r.json())
        // .then(json => fetchProductsSuccess([...product,...json]));

        //  .catch(error => console.error('Error retrieving Companies: ' + error));
       }
      loadMore=()=>{
        this.setState(prevState =>({
          offset:prevState.offset+10
        }),this.loadProduct)     
      }

    render() {
        const { classes,products, error, pending } = this.props;
        console.log("product value is "+products.json())
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
              <StyledTableCell align="right">{product.barcode}</StyledTableCell>
              <StyledTableCell align="right">{product.quantity}</StyledTableCell>
              <StyledTableCell align="right">{product.quantityType}</StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
              <StyledTableCell align="right">{product.dateCreated}</StyledTableCell>
              <StyledTableCell align="right">{product.lastUpate}</StyledTableCell>
              <StyledTableCell align="right">{product.createBy}</StyledTableCell>
              <StyledTableCell align="right">{product.address}</StyledTableCell>

            </StyledTableRow>);
          }
      
          if(!this.shouldComponentRender()) return <LinearProgress />


        return(
          <Grid container component="main" className={classes.root}>
         
          <Grid item  sm={12} md={12}  component={Paper} elevation={6} square>
            <Paper className={classes.root}>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Id</StyledTableCell>
            <StyledTableCell align="right">Product Name</StyledTableCell>
            <StyledTableCell align="right">Barcode</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Quantity Type</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Last Updated</StyledTableCell>
            <StyledTableCell align="right">Created by</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <renderProductRow product={products}/>
        {this.state.product.map(renderProductRow)}
        </TableBody>
      </Table>

      <Button onClick={this.loadMore}>Load More</Button>
    </Paper>
    </Grid>
    </Grid>
        );
    }
}


// const mapDispatchToProps = dispatch => bindActionCreators({
//     fetchProducts: ProductController
// }, dispatch)

export default connect(mapStateToProps)(withStyles(useStyles)(Product));