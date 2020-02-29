import {
   POST_PRODUCTS_PENDING,
   POST_PRODUCTS_SUCCESS, 
   POST_PRODUCTS_ERROR,
   FETCH_PRODUCTS_SUCCESS,
   FETCH_PRODUCTS_ERROR,
   FETCH_PRODUCTS_PENDING,

  } from './ActionCreateProductName';

  
  const initialState = {
    items: [],
    loading: true,
    error: null,
    postSuccess:'',
  };
  
  export default function productReducer(state = initialState,action) {

    switch (action.type) {

      case POST_PRODUCTS_PENDING:
     
        return {
          ...state,
          loading: true,
          error: null
        };
  
  
  
      case POST_PRODUCTS_SUCCESS:
      
        const k = action.payload.send
        return Object.assign({}, state, {
          loading:false,
          error:null,
          postSuccess:k,
          });
  
      case POST_PRODUCTS_ERROR:
     
        return {
          ...state,
          loading: false,
          error: action.error,
          items: []
        };

        case FETCH_PRODUCTS_PENDING:

        return {
          ...state,
          loading: true,
          error: null
        };
  
  
  
      case FETCH_PRODUCTS_SUCCESS:

        const u = {[action.payload.props]:[action.payload.send]}
        // return {
        //   ...state,
        //   ...state.items,
        //   loading : false,
         
        //   items: u
        // };

        return Object.assign({}, state, {
         
          items: state.items.concat(u),
          loading:false,
          error:null,
          });
  
      case FETCH_PRODUCTS_ERROR:
    
        return {
          ...state,
          loading: false,
          error: action.error,
          items: []
        };
  
  
      default:
        return state;
    }
  }




// export const getProducts = state =>  state.items;
// export const u = state=>console.log('reduc check',(state));
// export const getProductsPending = state => state.loading;
// export const getProductsError = state => state.error;
  