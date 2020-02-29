import React, { useState } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Button ,ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Barcode from 'react-barcode';

import {fetchDetails} from './ActionCreateProductName';
import { useStore } from 'react-redux'


const useStyles = makeStyles(theme => ({
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



}));


// function sleep(delay = 0) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }




function CreateProduct ({fetchDetails, load, fetched, user}) {

  console.log("checking")

  // React.useEffect(() => {

  // //   if (!load) {
  // //     return undefined;
  // //   }

  // //   (async () => {
  //   async function fetchData ()  {
       fetchDetails('productName')
       .then( fetchDetails('quantityType'))
      .then(fetchDetails('lot'))
      .then(fetchDetails('address'))
      .then(fetchDetails("userByUsername?username="+JSON.parse(localStorage.auth).username));
      
  //     fetchData()
  //   // })
  //     // await sleep(1e3); // For demo purposes.
  //     // const countries = await response.json();

  //     // if (load) {
  //     //   // setOptions(Object.keys(countries).map(key => countries[key].item[0]));
    // },[load]);

    // React.useEffect(() => {
    //   fetchData();
    // },[load])
   



  //   })();

  //   return () => {
  //     load = false;
  //   };
  // }, load);

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);
  


    // fetchDetails('productName')
    //  fetchDetails('quantityType')
    //  fetchDetails('lot')
    //  fetchDetails('address')
    //  fetchDetails("userByUsername?username="+JSON.parse(localStorage.auth).username)
    
    

    const store = useStore()
    console.log('getting state',store.getState())





    const classes = useStyles();

    const {createProductDetails} = useState();

    var handleChange = (event) =>{
      Object.assign({},createProductDetails,{ 
          [event.target.name ]: [event.target.value],
        })
        document.getElementsByName(event.target.name).value=event.target.value;
    }

    var handleclear = (event) => {
        event.preventDefault()
        document.getElementById("create-course-form").reset()
        createProductDetails({ })
    }

    var handleSubmit = (event) => {
        event.preventDefault()
        // createProductDetails
    }


    // store.subscribe(() => {
    //   // When state will be updated(in our case, when items will be fetched), 
    //   // we will update local component state and force component to rerender 
    //   // with new data.

    //     fetched ( store.getState() );
    // });
  


    // let Total=0;
    // Total=parseFloat(this.state.price)*parseFloat(this.state.numberValue)
    

    return !load ? (
    
      // <React.Fragment>

      <div>
      {/* {!{load} ? ( */}

        <div  component="main" className={classes.root}  >
              <div  className={classes.root}  >
                <Grid sm={6} md={12}>
           <ButtonGroup fullWidth aria-label="full width outlined button group">
           <Button className={classes.content} href="/warehouse/product/list">List Product</Button>
           <Button className={classes.content} href="/warehouse/product/create">Create Product</Button>
         </ButtonGroup>
         </Grid>
               </div>
      
               <div className={classes.content}>
      
               <Card>
                <form id="create-course-form" onSubmit={handleSubmit} >
                  <CardContent >
                  <div className={classes.content}>
      
      
          <Grid container component="main">
            <div className={classes.root}>
      
             <CardContent >
                 <Typography className={classes.title} color="primary" variant="h2" component="h1" gutterBottom>
                     Create Product Profile
                 </Typography>
      
         
                     <TextField
                              id="demo-simple-select-outlined-label"
                              select 
                              label="Product Name"
                              name = 'productName'
                              // value={createProductDetails.productName}
                              onChange={handleChange}
                              variant="outlined"
                              >
                                  {fetched.map(option =>(
                                      <MenuItem key={option.id} value={option.id}>
                                          {option.name}
                                      </MenuItem>
                                  ))}
                              </TextField>
                   <TextField
                id="outlined-full-width"
                className={classes.textField}
                label="Price"
                style={{ margin: 8 }}
                placeholder="Price"
                fullWidth
                margin="normal"
                name = 'price'
                // value = {createProductDetails.price}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
                   
                   <TextField
                id="outlined-full-width"
                name = "numberOfItems"
                className={classes.textField}
                label="Number of Items"
                style={{ margin: 8 }}
                placeholder="Number of Items"
                fullWidth
                margin="normal"
                onChange={handleChange}
                // value = {createProductDetails.numberOfItems}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
                  
                   <TextField
                id="outlined-full-width"
                name= "barcode"
                className={classes.textField}
                label="Barcode"
                style={{ margin: 8 }}
                placeholder="Barcode"
                fullWidth
                margin="normal"
                onChange={handleChange}
                // value = {createProductDetails.barcode}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
                <Barcode value={createProductDetails.barcode} />,
      
                   
           
                   <TextField
                              id="demo-simple-select-outlined-label"
                              select 
                              name = "lot"
                              label="Lot"
                              onChange={handleChange}
                              // value = {createProductDetails.lot}
                              variant="outlined"
                              >
                                  {fetched.lot.map(option =>(
                                      <MenuItem key={option.id} value={option.id}>
                                          {option.lotname}
                                      </MenuItem>
                                  ))}
                              </TextField>
          
      
                  
                   <TextField
                id="outlined-full-width"
                value= "Quantity"
                className={classes.textField}
                label="Quantity"
                style={{ margin: 8 }}
                placeholder="Quantity"
                fullWidth
                margin="normal"
                onChange={handleChange}
                name = 'quantity'
                // value = {createProductDetails.quantity}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
                   
        
                   <TextField
                              id="demo-simple-select-outlined-label"
                              select 
                              label="Quantity Type"
                              name = "QuantityType"
                              onChange={handleChange}
                              // value = {createProductDetails.QuantityType}
                              variant="outlined"
                              >
                                  {fetched.quantityType.map(option =>(
                                      <MenuItem key={option.id} value={option.id}>
                                          {option.name}
                                      </MenuItem>
                                  ))}
                              </TextField>
      
      
                              <CardActions>
              <ButtonGroup fullWidth aria-label="full width outlined button group">
                  <Button type="Submit" className={classes.Button} variant="contained" size="Medium" color="primary">
                      Save
                  </Button>
              </ButtonGroup>
      
            <ButtonGroup fullWidth aria-label="full width outlined button group">
            <Button type='Submit' onClick={handleclear} variant="contained" size="Medium" color="primary">
               Reset
            </Button>
            </ButtonGroup>
          
            <div className={classes.root}>
                {user.error}
              
            </div>
            </CardActions>
      
      
        </CardContent>
        </div>
        </Grid>
        </div>
        </CardContent>
        </form>
      
      </Card>
      </div>
      
      
      </div>
          
          {/* ) :(
            <p>Loading</p>
          ) } */}
     
      </div>

      // </React.Fragment>
     

  
  ) :(
    <p>Loading</p>
  ) }
    
                                  

// 

const mapStateToProps = state =>  (console.log(state),{
  username:state.products.postSuccess,
  user:state.products.error,
  // fetched : state.products.items,
  load: state.products.loading,
  fetched :  state.products.productName,
  },console.log("ending ",state));
  
const mapDispatchToProps = { fetchDetails };


    
    
export default connect(mapStateToProps,mapDispatchToProps)(CreateProduct);

