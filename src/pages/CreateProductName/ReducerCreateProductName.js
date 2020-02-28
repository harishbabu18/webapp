import postProductsToDatabase, {POST_PRODUCTS_PENDING, POST_PRODUCTS_TO_DATABASE_ACTION, POST_PRODUCTS_SUCCESS, POST_PRODUCTS_ERROR, postProductsToDatabaseAction} from './ActionCreateProductName';
// import { connect, useDispatch } from 'react-redux';

  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    postSuccess:'',
  };
  
  export default function productReducer(state = initialState,action) {

    switch (action.type) {

      // case POST_PRODUCTS_TO_DATABASE_ACTION:
      //   const u = action.payload

      //   return(Object.assign({},state,{
      //       items:u
      //   }),
      //   postProductsToDatabase(state.items))


      case POST_PRODUCTS_PENDING:
     
        return {
          ...state,
          loading: true,
          error: null
        };
  
  
  
      case POST_PRODUCTS_SUCCESS:
      
        const k = action.payload.send
        // console.log(u)
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
  
      default:
        return state;
    }
  }




// export const getProducts = state =>  state.items;
// export const u = state=>console.log('reduc check',(state));
// export const getProductsPending = state => state.loading;
// export const getProductsError = state => state.error;
  