// LoginSection.js

import React,{useState, Component} from 'react';
import { connect, useDispatch } from 'react-redux';
import postProductsToDatabase, {POST_PRODUCTS_PENDING, POST_PRODUCTS_TO_DATABASE_ACTION, POST_PRODUCTS_SUCCESS, POST_PRODUCTS_ERROR, postProductsToDatabaseAction} from './ActionCreateProductName';


function CreateProductName ({username, postProductsToDatabase }) {
  // const dispatch = useDispatch();

// fetchProducts('/contact')

  return(
      <main>
      <div>Count :{username} </div>
      <button onClick={()=>postProductsToDatabase({path:'/product',post:{name:'Top Gig'}})}>Add to count</button>

      <div>Count: </div>
      {/* <button onClick={()=>fetchProducts('/product')}>Add to count</button> */}
    </main>
 
  )

  }


  

const mapStateToProps = state => (console.log(state),{
username:state.products.postSuccess,
user:state.products.error
});

const mapDispatchToProps = { postProductsToDatabase };


export default connect(mapStateToProps,mapDispatchToProps)(CreateProductName);